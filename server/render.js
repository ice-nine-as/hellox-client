import {
  App,
} from '../src/Components/App';
import createHistory from 'history/createMemoryHistory';
import {
  flushChunkNames,
} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import {
  createElement,
} from 'react';
import ReactDOMServer from 'react-dom/server';

export function render({ clientStats }) {
  return function respond(req, res) {
    const history = createHistory({
      initialEntries: [
        req.path,
      ],
    });

    const app = createElement(App, { history, });
    const appStr = ReactDOMServer.renderToString(app);
    const chunkNames = flushChunkNames();

    const {
      js,
      styles,
      cssHash,
      scripts,
      stylesheets,
    } = flushChunks(clientStats, { chunkNames, });

    console.log('PATH', req.path);
    console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
    console.log('SCRIPTS SERVED', scripts);
    console.log('STYLESHEETS SERVED', stylesheets);

    res.send(
      `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>X50</title>
            ${styles}
          </head>
          <body>
            <div id="root">${appStr}</div>
            ${cssHash}
            ${js}
          </body>
        </html>`
    );
  };
}

export default render;