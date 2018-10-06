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
} from 'redux';
import {
  flushChunkNames,
} from 'react-universal-component/server';
import {
  renderDocument,
} from './renderDocument';
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
let webpSnifferString: string;

const fontLoaderPath = join(serverDirPath, 'fontLoader.js');
let fontLoaderString: string;

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
        cssHash,
        scripts,
        stylesheets,
      } = flushChunks(clientStats, {
        chunkNames,
        outputPath: join(projectDirPath, 'dist', 'client'),
      });

      /* Useful for specific (probably webpack-oriented) debugging but too
       * noisy for daily use. 
      console.log(
        ` PATH                        : ${req.path}\n`,
        `DYNAMIC CHUNK NAMES RENDERED: ${chunkNames.join(', ')}\n`,
        `SCRIPTS SERVED              : ${scripts.join(', ')}\n`,
        `STYLESHEETS SERVED          : ${stylesheets.join(', ')}`);*/

      const promises: Array<Promise<any>> = [];
      /* Of equal length to the promises array. Provides information as to
       * which value any given promise has produced. */
      const promMetas: Array<
        'configureStore' |
        'serverPush' |
        'webpSniffer' |
        'fontLoader'
      > = [];

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

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Encoding', 'gzip');

      if (!webpSnifferString) {
        promises.push(readFileProm(webpSnifferPath));
        promMetas.push('webpSniffer');
      }

      if (!fontLoaderString) {
        promises.push(readFileProm(fontLoaderPath));
        promMetas.push('fontLoader');
      } 

      let abort = false;
      const allPromise = Promise.all<any>(promises);
      allPromise.then(() => {}, (err) => {
        console.error(err);
        console.error('One or more critical promises failed in the render ' +
                      'function.');
        /* Unsure what this does -- seems pointless. */
        abort = false;
      });

      const results = await allPromise;
      if (abort) {
        return;
      }

      let store: Store<TStoreProps> | null = null;
      //let rssFetchFailed = false;
      results.forEach((result, index) => {
        /* Unroll promises and perform necessary logic on each. */
        if (promMetas[index] === 'configureStore') {
          store = (result as any).store;
          //rssFetchFailed = (result as any).rssFetchFailed;
        } else if (promMetas[index] === 'webpSniffer') {
          webpSnifferString = result;
        } else if (promMetas[index] === 'fontLoader') {
          fontLoaderString = result;
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
      
      const providerContainer = (
        <ProviderContainer store={store}>
          <ConnectedApp />
        </ProviderContainer>
      );
      
      const appString = ReactDOMServer.renderToString(providerContainer);
      const description = getMetaDescription(location);
      const preloadAndPreconnectLinks = getPreloadAndPreconnectLinks(
        location,
      );

      const reduxStateString = JSON.stringify(state);
      const _scripts = scripts.map((url) => (
        '<script ' +
          'class="chunkedScript" ' +
          `src="/static/${url}" ` +
        '></script>'
      ));

      const _stylesheets = [ `<style id="ambientStyle">${AmbientStyle}</style>` ].concat(
        stylesheets.map((url) => (
          '<link ' +
            'preload ' +
            'class="chunkedStyle" ' +
            'rel="stylesheet" ' +
            `href="/static/${url}" ` +
          '/>'
        ))
      );

      const title = getPageTitle(location);

      const documentStr = renderDocument({
        appString,
        cssHash: cssHash.toString(),
        description,
        fontLoaderString,
        language,
        preloadAndPreconnectLinks,
        reduxStateString,
        scripts: _scripts,
        stylesheets: _stylesheets,
        title,
        webpSnifferString,
      });

      /* Compress the document string and send it to the browser. May want to
       * swap this out for a streaming approach (with
       * ReactDOMServer.renderToNodeStream). This will require splitting
       * renderDocument into a before-app render function and after-app render
       * function, though. */
      // @ts-ignore
      const zipped = await promisify(gzip)(documentStr);
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
