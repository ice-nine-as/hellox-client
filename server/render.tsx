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
  readFile,
} from 'fs';
import {
  getMetaDescription,
} from './getMetaDescription';
import {
  getPageTitle,
} from './getPageTitle';
import {
  getPreloadAndPreconnectLinks,
} from './getPreloadAndPreconnectLinks';
import {
  isHttp2,
} from './isHttp2';
import {
  join,
} from 'path';
import {
  ProviderContainer,
} from '../src/Components/ProviderContainer';
import {
  Store,
} from 'react-redux';
import {
  flushChunkNames,
} from 'react-universal-component/server';
import {
  serverPush,
} from './serverPush';
import {
  ServerResponse,
} from 'spdy';
import {
  promisify,
} from 'util';
import {
  TStoreProps,
} from '../src/TypeAliases/TStoreProps';
import {
  Stats,
} from 'webpack';
import {
  gzip,
} from 'zlib';

import * as React from 'react';
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

const projectDirPath = join(__dirname, '..', '..');
const serverDirPath  = join(projectDirPath, 'server');

const webpSnifferPath = join(serverDirPath, 'webpSniffer.js');
let webpSnifferElement: string | null = null;

const fontLoaderPath = join(serverDirPath, 'fontLoader.js');
let fontLoaderElement: string | null = null;

export const helloXRender = ({ clientStats }: { clientStats: Stats }) => {
  const helloXResponse = async (
    req: Request,
    res: Response,
    next: NextFunction) =>
  {
    try {
      /* Do not render the 404 page or the redux store for non-page lookups.
       * Doing so wastes huge amounts of time and process. */
      const re = /\/[^./]+\/?$/;
      if (req.url !== '/' && !re.test(req.url)) {
        console.error(`Object at ${req.url} not found.`);
        res.status(404);
        res.end();
        /* Make sure to end the connection, otherwise it hangs permanently. */
        return;
      }

      const chunkNames = flushChunkNames();
      const {
        css,
        cssHash,
        js,
        scripts,
        stylesheets,
      } = flushChunks(clientStats, {
        chunkNames,
        outputPath: join(projectDirPath, 'dist', 'client'),
      });
      
      console.log(
        ` PATH                        : ${req.path}\n`,
        `DYNAMIC CHUNK NAMES RENDERED: ${chunkNames.join(', ')}\n`,
        `SCRIPTS SERVED              : ${scripts.join(', ')}\n`,
        `STYLESHEETS SERVED          : ${stylesheets.join(', ')}`);
        
      const promises: Array<Promise<any>> = [];
      const promMetas: Array<'configureStore' | 'serverPush' | 'webpSniffer' | 'fontLoader'> = [];
      
      /* Double cast is because TS complains with the normal cast. The res
        * variable is definitely a SPDY response if isHttp2 returns true. */
      const _res = res as any as ServerResponse;
      if (isHttp2() && typeof _res.push === 'function') {
        promises.push(new Promise<any>((resolve) => {
          try {
            serverPush({
              /*req,*/
              res: _res,
              scripts,
              stylesheets,
            }).then(resolve, resolve);
          } catch (e) {
            console.error('There was an error pushing files:');
            console.error(e);
            resolve();
          }
        }));

        promMetas.push('serverPush');
      }

      /* Configure the server-side, initial-state Redux store. */
      promises.push(new Promise<any>((resolve, reject) => {
        try {
          configureServerStore(req, res).then((value) => resolve(value));
        } catch (e) {
          console.error(
            strings.CONFIGURE_SERVER_STORE_FAILED,
            '\n\nThe error was:\n',
            e);
  
          res.status(500);
          res.end();
          reject();
        }
      }));

      promMetas.push('configureStore');

      const ambientStyleElement =
        `<style id="ambientStyle">${AmbientStyle}</style>`;
      
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Encoding', 'gzip');
      
      if (!webpSnifferElement) {
        promises.push(readFileProm(webpSnifferPath));
        promMetas.push('webpSniffer');
      }
      
      if (!fontLoaderElement) {
        promises.push(readFileProm(fontLoaderPath));
        promMetas.push('fontLoader');
      }

      let abort = false;
      const allPromise = Promise.all<any>(promises);
      allPromise.then(() => {}, (err) => {
        console.error(err);
        console.error('One or more critical promises failed in the render function.');
        abort = false;
      });

      const results = await allPromise;
      if (abort) {
        return;
      }

      let store: Store<TStoreProps> | null = null;
      let rssFetchFailed = false;
      results.forEach((result, index) => {
        /* Unroll promises and perform necessary logic on each. */
        if (promMetas[index] === 'configureStore') {
          store = (result as any).store;
          rssFetchFailed = (result as any).rssFetchFailed;
        } else if (promMetas[index] === 'webpSniffer') {
          webpSnifferElement =
            `<script id="webpSniffer">
              ${result}
            </script>`;
        } else if (promMetas[index] === 'fontLoader') {
          fontLoaderElement =
            `<script async defer id="fontLoader">
              ${result}
            </script>`;
        }
      });

      /* No store means redirect was already served. */
      if (!store) {
        return;
      }

      const state = (store as Store<TStoreProps>).getState();
      const {
        language,
        location,
      } = state;
      const stateStr = JSON.stringify(state);
      const varDef  = `window.REDUX_STATE = ${stateStr};`;
      const reduxScript = `<script id="reduxState">${varDef}</script>`;

      const providerContainer = (
        <ProviderContainer store={store}>
          <ConnectedApp />
        </ProviderContainer>
      );
      
      const appStr = ReactDOMServer.renderToString(providerContainer);
      
      const responseStr =
        `<!DOCTYPE html>
        <html lang="${language || 'en'}">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="theme-color" content="#ea5050">
            <meta name="msapplication-TileColor" content="#ea5050">
            <meta name="msapplication-TileImage" content="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/ms-icon-144x144_v2.png">
            ${getMetaDescription(location)}
            <link rel="apple-touch-icon" sizes="57x57" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-57x57_v2.png">
            <link rel="apple-touch-icon" sizes="60x60" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-60x60_v2.png">
            <link rel="apple-touch-icon" sizes="72x72" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-72x72_v2.png">
            <link rel="apple-touch-icon" sizes="76x76" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-76x76_v2.png">
            <link rel="apple-touch-icon" sizes="114x114" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-114x114_v2.png">
            <link rel="apple-touch-icon" sizes="120x120" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-120x120_v2.png">
            <link rel="apple-touch-icon" sizes="144x144" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-144x144_v2.png">
            <link rel="apple-touch-icon" sizes="152x152" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-152x152_v2.png">
            <link rel="apple-touch-icon" sizes="180x180" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/apple-icon-180x180_v2.png">
            <link rel="icon" type="image/png" sizes="192x192" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/android-icon-192x192_v2.png">
            <link rel="icon" type="image/png" sizes="32x32" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/favicon-32x32_v2.png">
            <link rel="icon" type="image/png" sizes="96x96" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/favicon-96x96_v2.png">
            <link rel="icon" type="image/png" sizes="16x16" href="https://s3.eu-central-1.amazonaws.com/hellox/images/app-icons/favicon-16x16_v2.png">
            <link rel="manifest" href="/static/manifest.json">
            ${getPreloadAndPreconnectLinks(location, rssFetchFailed)}
            <title>${getPageTitle(location)}</title>
            ${webpSnifferElement}
            ${ambientStyleElement}
            ${css}
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-121190776-1"></script>
            <script id="gtag">
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','UA-121190776-1');
            </script>
          </head>
          <body>
            ${fontLoaderElement}
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

      /* We don't currently (03.18) have any middleware after this, but it's
       * called in case we ever add any. */
      if (typeof next === 'function') {
        next();
      }
    } catch (e) {
      /* Catch all errors. Do not allow uncaught exceptions to cause server to
       * hang. Without this, you will get invisible errors, the server will
       * hang forever, and I'm not 100% sure why. My suspicion is that the way
       * Babel transforms async functions into ES5 somehow eats errors. */
      console.error(`Server encountered an error:\n${e}`);
      console.trace();
      res.status(500);
      res.end();
      return;
    }
  }

  return helloXResponse;
}

export default helloXRender;
