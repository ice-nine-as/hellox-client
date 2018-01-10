import {
  configureServerStore,
} from './configureServerStore';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  ProviderContainer,
} from '../src/Components/ProviderContainer';
import {
  flushChunkNames,
} from 'react-universal-component/server';
import {
  Stats,
} from 'webpack';

// @ts-ignore
import AmbientStyle from '../src/Styles/AmbientStyle';

import * as React          from 'react';
import * as ReactDOMServer from 'react-dom/server';

import flushChunks         from 'webpack-flush-chunks';

export const strings = {
  CONFIGURESERVERSTORE_FAILED:
    'An exception was encountered while configuring the Redux store on the ' +
    'server.',
};

export function x50Render({ clientStats }: { clientStats: Stats }) {
  return async function x50Response(
    req:   Request,
    res:   Response,
    // @ts-ignore
    next?: NextFunction)
  {
    let store;
    try {
      store = await configureServerStore(req, res);
    } catch (e) {
      console.log(strings.CONFIGURESERVERSTORE_FAILED, '\n\nThe error was:', e);
      throw e;
    }

    if (!store) {
      /* no store means redirect was already served. */
      return;
    }

    const state             = store.getState();
    const stateStr          = JSON.stringify(state);
    const openTag           = '<script id="reduxState">';
    const varDef            = 'window.REDUX_STATE = ';
    const closeTag          = '</script>';
    const reduxScript       = openTag + varDef + stateStr + closeTag;
    const providerContainer = <ProviderContainer store={store} />;
    const appStr            = ReactDOMServer.renderToString(providerContainer);
    const chunkNames        = flushChunkNames();
    const {
      js,
      styles,
      cssHash,
      scripts,
      stylesheets,
    } = flushChunks(clientStats, { chunkNames, });

    const ambientStyleElement =
      `<style id="ambientStyle">${AmbientStyle}</style>`;

    console.log(
      ` PATH                        : ${req.path}\n`,
      `DYNAMIC CHUNK NAMES RENDERED: ${chunkNames.join(', ')}\n`,
      `SCRIPTS SERVED              : ${scripts.join(', ')}\n`,
      `STYLESHEETS SERVED          : ${stylesheets.join(', ')}`);

    const responseStr =
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>X50</title>
          ${ambientStyleElement}
          ${styles}
        </head>
        <body>
          <script type="text/javascript" src="/static/vendor.js"></script>
          <div id="root">${appStr}</div>
          ${cssHash}
          ${reduxScript}
          ${js}
        </body>
      </html>`;

    res.send(responseStr);
  };
}

export default x50Render;