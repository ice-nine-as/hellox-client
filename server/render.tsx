import {
  ConnectedApp,
} from '../src/Components/App';
import {
  configureServerStore,
} from './configureServerStore';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  externalLibs,
} from '../src/Properties/externalLibs';
import {
  readFile,
} from 'fs';
import {
  isHttp2,
} from '../src/Modules/isHttp2';
import {
  resolve,
} from 'path';
import {
  ProviderContainer,
} from '../src/Components/ProviderContainer';
import {
  flushChunkNames,
} from 'react-universal-component/server';
import {
  ServerResponse,
} from 'spdy';
import {
  promisify,
} from 'util';
import {
  Stats,
} from 'webpack';
import {
  gzip,
} from 'zlib';

import * as React          from 'react';
import * as ReactDOMServer from 'react-dom/server';

import flushChunks from 'webpack-flush-chunks';

// @ts-ignore
import AmbientStyle from '../src/Styles/AmbientStyle.css';


export const strings = {
  CONFIGURE_SERVER_STORE_FAILED:
  'An exception was encountered while configuring the Redux store on the ' +
  'server.',
};

const readFileProm = promisify(readFile);

const handlePushError = (err: Error | undefined) => {
  if (err) {
    console.error(err);
  }
};

const nodeSpdyOptions = {
  request: {
    accept: '*/*'
  },

  response: {
    'content-type':     'application/javascript',
    'content-encoding': 'gzip',
  },
};

export const x50Render = ({ clientStats }: { clientStats: Stats }) => {
  const x50Response = async (
    req:   Request,
    res:   Response,
    // @ts-ignore
    next?: NextFunction) =>
  {
    /* Do not render the 404 page for failed code and image lookups, or for
     * codefiles of which we already know the location. Doing so wastes huge 
     * amounts of time and process. */
    if (/(\.(js|css)(\.map)?$)|\.(jpg|png|svg)|__webpack_hmr$/.test(req.url)) {
      /* Check and see if the request is for one of the whitelisted external
       * libs not bundled by webpack. As of 03.2018 this is just modernizr. */
      const fileName = (() => {
        const split = req.url.split('/').filter((aa) => aa.length > 0);
        return split[split.length - 1];
      })();

      const isExternalLib = externalLibs.some((lib) => {
        return fileName.indexOf(lib) !== -1;
      });

      if (isExternalLib) {
        const path = resolve(__dirname, '..', 'client', fileName);
        console.log(`Sending external lib ${fileName} from ${path}.`);
        res.sendFile(path);
        return;
      } else {
        console.error(`Object at ${req.url} not found.`);
        res.status(404);
        res.end();
        /* Make sure to end the connection, otherwise it hangs permanently. */
        return;
      }
    } else if (req.url === '/manifest.json') {
      /* Needed for Progressive Web App support. */
      res.sendFile(resolve(__dirname, '..', 'client', 'manifest.json'));
      return;
    }

    let store;
    try {
      store = await configureServerStore(req, res);
    } catch (e) {
      console.error(
        strings.CONFIGURE_SERVER_STORE_FAILED,
        '\n\nThe error was:\n',
        e);

      res.end();
      throw e;
    }

    if (!store) {
      /* No store means redirect was already served. */
      return;
    }

    const state             = store.getState();
    const stateStr          = JSON.stringify(state);
    const openTag           = '<script id="reduxState">';
    const varDef            = 'window.REDUX_STATE = ';
    const closeTag          = '</script>';
    const reduxScript       = openTag + varDef + stateStr + closeTag;
    const providerContainer = (
                                <ProviderContainer store={store}>
                                  <ConnectedApp />
                                </ProviderContainer>
                              );

    const appStr            = ReactDOMServer.renderToString(providerContainer);
    const chunkNames        = flushChunkNames();
    const {
      css,
      cssHash,
      js,
      scripts,
      stylesheets,
    } = flushChunks(clientStats, {
      chunkNames,
      outputPath: resolve(__dirname, '..', 'client'),
    });

    if (isHttp2()) {
      const files = await Promise.all([
        readFileProm(resolve(__dirname, '..', 'client', 'vendor.js.gz')),
        ...scripts.map((fileName) => {
          const path = resolve(__dirname, '..', 'client', `${fileName}.gz`);
          return readFileProm(path);
        }),
      ]);

      const spdyRes = res as any as ServerResponse;

      const vendorStream = spdyRes.push('/static/vendor.js', nodeSpdyOptions);
      vendorStream.on('error', handlePushError);
      vendorStream.end(files[0]);

      for (let ii = 1; ii < files.length; ii += 1) {
        const fileName = scripts[ii - 1];
        const stream = spdyRes.push(`/static/${fileName}`, nodeSpdyOptions);
        stream.on('error', handlePushError);
        stream.end(files[ii]);
      }
    }

    const ambientStyleElement =
      `<style id="ambientStyle">${AmbientStyle}</style>`;

    console.log(
      ` PATH                        : ${req.path}\n`,
      `DYNAMIC CHUNK NAMES RENDERED: ${chunkNames.join(', ')}\n`,
      `SCRIPTS SERVED              : ${scripts.join(', ')}\n`,
      `STYLESHEETS SERVED          : ${stylesheets.join(', ')}`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Encoding', 'gzip');

    const responseStr =
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="theme-color" content="rgb(234, 80, 80)">
          <link rel="manifest" href="/manifest.json">
          <title>Hello X</title>
          ${ambientStyleElement}
          ${css}
        </head>
        <body>
          <script type="text/javascript">
            /*! modernizr 3.5.0 (Custom Build) | MIT *
            * https://modernizr.com/download/?-mq !*/
            !function(e,n,t){function o(e,n){return typeof e===n}function a(){var e,n,t,a,i,s,r;for(var d in l)if(l.hasOwnProperty(d)){if(e=[],n=l[d],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(a=o(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],r=s.split("."),1===r.length?Modernizr[r[0]]=a:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=a),f.push((a?"":"no-")+r.join("-"))}}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):c?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function s(){var e=n.body;return e||(e=i(c?"svg":"body"),e.fake=!0),e}function r(e,t,o,a){var r,l,d,f,c="modernizr",p=i("div"),h=s();if(parseInt(o,10))for(;o--;)d=i("div"),d.id=a?a[o]:c+(o+1),p.appendChild(d);return r=i("style"),r.type="text/css",r.id="s"+c,(h.fake?h:p).appendChild(r),h.appendChild(p),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(n.createTextNode(e)),p.id=c,h.fake&&(h.style.background="",h.style.overflow="hidden",f=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=f,u.offsetHeight):p.parentNode.removeChild(p),!!l}var l=[],d={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){l.push({name:e,fn:n,options:t})},addAsyncTest:function(e){l.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var f=[],u=n.documentElement,c="svg"===u.nodeName.toLowerCase(),p=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return r("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();d.mq=p,a(),delete d.addTest,delete d.addAsyncTest;for(var h=0;h<Modernizr._q.length;h++)Modernizr._q[h]();e.Modernizr=Modernizr}(window,document);            

            /* Hello X logic */
            if (Modernizr.mq('(min-device-width: 1001px) and (min-width: 1001px)')) {
              document.body.parentElement.className = 'monitor';
            }
          </script>
          <script defer type="text/javascript" src="/static/vendor.js"></script>
          <div id="root">${appStr}</div>
          ${cssHash}
          ${reduxScript}
          ${js}
        </body>
      </html>`;

    // @ts-ignore
    const zipped = await promisify(gzip)(responseStr);
    res.send(zipped);

    //res.send(responseStr);
  };

  return x50Response;
}

export default x50Render;