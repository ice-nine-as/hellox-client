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
  resolve,
} from 'path';
import {
  ProviderContainer,
} from '../src/Components/ProviderContainer';
import {
  flushChunkNames,
} from 'react-universal-component/server';
import {
  Stats,
} from 'webpack';

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

export const x50Render = ({ clientStats }: { clientStats: Stats }) => {
  const x50Response = async (
    req:   Request,
    res:   Response,
    // @ts-ignore
    next?: NextFunction) =>
  {
    /* Do not render the 404 page for failed code and image lookups. Doing so
     * wastes huge amount of time and process. */
    if (/(\.(js|css)(\.map)?$)|\.(jpg|png|svg)|__webpack_hmr$/.test(req.url)) {
      /* Check and see if the request is for one of the whitelisted external
       * libs not bundled by webpack. As of 03.2018 this is just modernizr. */
      const fileName = (() => {
        const split = req.url.split('/').filter((aa) => aa);
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
      res.sendFile(resolve(__dirname, '..', 'client', 'manifest.json'));
      console.log(`Sending manifest.`);
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

    const ambientStyleElement =
      `<style id="ambientStyle">${AmbientStyle}</style>`;

    console.log(
      ` PATH                        : ${req.path}\n`,
      `DYNAMIC CHUNK NAMES RENDERED: ${chunkNames.join(', ')}\n`,
      `SCRIPTS SERVED              : ${scripts.join(', ')}\n`,
      `STYLESHEETS SERVED          : ${stylesheets.join(', ')}`);

    const responseStr =
      `<!DOCTYPE html>
      <html lang="en">
        <head class="mobile">
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="theme-color" content="rgb(234, 80, 80)">
          <link rel="manifest" href="/manifest.json">
          <title>X50</title>
          ${ambientStyleElement}
          ${css}
        </head>
        <body>
          <script type="text/javascript" src="/static/modernizr.js"></script>
          <script type="text/javascript">
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

    res.send(responseStr);
  };

  return x50Response;
}

export default x50Render;