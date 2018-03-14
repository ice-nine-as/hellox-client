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
    console.trace(err);
  }
};

const nodeSpdyOptions = {
  request: {
    accept: '*/*'
  },
};

const nodeSpdyJsOptions = Object.assign({}, nodeSpdyOptions, {
  response: { 
    'content-type': 'application/javascript',
    'content-encoding': 'gzip',
  },
});

const nodeSpdyCssOptions = Object.assign({}, nodeSpdyOptions, {
  response: {
    'content-type': 'text/css',
    'content-encoding': 'gzip',
  },
});

const serverDirPath = resolve(__dirname, '..', '..', 'server');

const viewportSnifferPath = resolve(serverDirPath, 'viewportSniffer.js');  
let viewportSnifferElement: string | null = null;

const fontLoaderPath = resolve(serverDirPath, 'fontLoader.js');
let fontLoaderElement: string | null = null;

export const x50Render = ({ clientStats }: { clientStats: Stats }) => {
  const x50Response = async (
    req:  Request,
    res:  Response,
    next: NextFunction) =>
  {
    try {
      /* Do not render the 404 page for failed code, image, and font lookups, or
      * for codefiles of which we already know the location. Doing so wastes
      * huge amounts of time and process. */
      if (/(\.(js|css)(\.map)?$)|\.(jpg|png|svg|woff2)|__webpack_hmr$/.test(req.url)) {
        console.error(`Object at ${req.url} not found.`);
        res.status(404);
        res.end();
        /* Make sure to end the connection, otherwise it hangs permanently. */
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

        res.status(500);
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
        cssHash,
        js,
        scripts,
        styles,
        stylesheets,
      } = flushChunks(clientStats, { chunkNames, });

      const getClientFilepath = resolve.bind(null, __dirname, '..', 'client');

      if (isHttp2()) {
        const spdyRes = res as any as ServerResponse;

        const scriptFiles = await Promise.all([
          readFileProm(getClientFilepath('vendor.js.gz')),
          ...scripts.map((fileName) => {
            const path = getClientFilepath(getClientFilepath(`${fileName}.gz`));
            return readFileProm(path);
          }),
        ]);

        const vendorStream = spdyRes.push('/static/vendor.js', nodeSpdyJsOptions);
        vendorStream.on('error', handlePushError);
        vendorStream.end(scriptFiles[0]);

        for (let ii = 1; ii < scriptFiles.length; ii += 1) {
          const fileName = scripts[ii - 1];
          const stream = spdyRes.push(`/static/${fileName}`, nodeSpdyJsOptions);
          stream.on('error', handlePushError);
          stream.end(scriptFiles[ii]);
        }

        const styleFiles = await Promise.all(stylesheets.map((path) => {
          return readFileProm(getClientFilepath(`${path}.gz`));
        }));

        styleFiles.forEach((file, index) => {
          const fileName = stylesheets[index];
          const stream = spdyRes.push(`/static/${fileName}`, nodeSpdyCssOptions);
          stream.on('error', handlePushError);
          stream.end(file);
        });
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
        viewportSnifferElement =
          `<script id="viewportSniffer">
            ${await readFileProm(viewportSnifferPath)}
          </script>`
      }

      if (!fontLoaderElement) {
        fontLoaderElement =
          `<script id="fontLoader">
            ${await readFileProm(fontLoaderPath)}
          </script>`;
      }

      const responseStr =
        `<!DOCTYPE html>
        <html class="mobile" lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="theme-color" content="rgb(234, 80, 80)">
            <link rel="manifest" href="/static/manifest.json">
            <title>Hello X</title>
            ${ambientStyleElement}
            ${fontLoaderElement}
            ${styles}
          </head>
          <body>
            ${viewportSnifferElement}
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

      /* We don't currently have any middleware after this, but it's called in
       * case we ever add any. */
      next();
    } catch (e) {
      /* Catch all errors. Do not allow uncaught exceptions to cause server to
       * hang. Without this, you will get invisible errors, the server will
       * hang forever, and I'm not 100% sure why. My suspicion is that the way
       * Babel transforms async functions into ES5 somehow eats errors. */
      console.error(e);
      res.status(500);
      res.end();
      return;
    }
  }

  return x50Response;
}

export default x50Render;