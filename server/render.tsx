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
  PageIdentifiers,
} from '../src/Enums/PageIdentifiers';
import {
  PageTitles,
} from '../src/Enums/PageTitles';
import {
  resolve,
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

const isHttp2: () => boolean = require('./isHttp2');

// @ts-ignore
import AmbientStyle from '../src/Styles/AmbientStyle.css';

export const strings = {
  CONFIGURE_SERVER_STORE_FAILED:
    'An exception was encountered while configuring the Redux store on the ' +
    'server.',
};

const readFileProm = promisify(readFile);

const projectDirPath = resolve(__dirname, '..', '..');
const serverDirPath = resolve(projectDirPath, 'server');

const viewportSnifferPath = resolve(serverDirPath, 'viewportSniffer.js');
let viewportSnifferElement: string | null = null;

const fontLoaderPath = resolve(serverDirPath, 'fontLoader.js');
let fontLoaderElement: string | null = null;

export const x50Render = ({ clientStats }: { clientStats: Stats }) => {
  const x50Response = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      /* Do not render the 404 page for failed code, image, and font lookups,
      * or for codefiles of which we already know the location. Doing so wastes
      * huge amounts of time and process. */
      const re = /(\.(js|css)(\.map)?$)|\.(jpg|png|svg|woff2)|__webpack_hmr$/;
      if (re.test(req.url)) {
        console.error(`Object at ${req.url} not found.`);
        res.status(404);
        res.end();
        /* Make sure to end the connection, otherwise it hangs permanently. */
        return;
      }

      let store: Store<TStoreProps> | null;
      try {
        store = await configureServerStore(req, res);
      } catch (e) {
        console.error(
          strings.CONFIGURE_SERVER_STORE_FAILED,
          '\n\nThe error was:\n',
          e);

        res.status(500);
        res.end();
        return;
      }

      if (!store) {
        /* No store means redirect was already served. */
        return;
      }

      const state = store.getState();
      const stateStr = JSON.stringify(state);
      const openTag = '<script id="reduxState">';
      const varDef = 'window.REDUX_STATE = ';
      const closeTag = '</script>';
      const reduxScript = openTag + varDef + stateStr + closeTag;
      const providerContainer = (
        <ProviderContainer store={store}>
          <ConnectedApp />
        </ProviderContainer>
      );

      const appStr = ReactDOMServer.renderToString(providerContainer);
      const chunkNames = flushChunkNames();
      const {
        css,
        cssHash,
        js,
        scripts,
        stylesheets,
      } = flushChunks(clientStats, {
        chunkNames,
        outputPath: resolve(projectDirPath, 'dist', 'client'),
      });


      if (isHttp2()) {
        try {
          await serverPush({
            /*req,*/
            /* Double cast is because TS complains with the normal cast. The res
             * variable is definitely a SPDY response if isHttp2 returns true. */
            res: res as any as ServerResponse,
            scripts,
            stylesheets,
          });
        } catch (e) {
          console.error('There was an error pushing files:');
          console.error(e);
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

      if (!viewportSnifferElement) {
        try {
          const viewportSniffer = await readFileProm(viewportSnifferPath);
          viewportSnifferElement =
            `<script id="viewportSniffer">
              ${viewportSniffer}
            </script>`
        } catch (e) { }
      }

      if (!fontLoaderElement) {
        try {
          const fontLoader = await readFileProm(fontLoaderPath);
          fontLoaderElement =
            `<script defer id="fontLoader">
              ${fontLoader}
            </script>`;
        } catch (e) { }
      }

      const responseStr =
        `<!DOCTYPE html>
        <html lang="${state.language || 'en'}">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="theme-color" content="rgb(234, 80, 80)">
            <link rel="manifest" href="/static/manifest.json">
            <title>Hello X - ${PageTitles[state.location.type as PageIdentifiers] || '?'}</title>
            ${viewportSnifferElement}
            ${ambientStyleElement}
            ${css}
            ${fontLoaderElement}
          </head>
          <body>
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

  return x50Response;
}

export default x50Render;