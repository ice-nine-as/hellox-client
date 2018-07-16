/*import {
  Request,
} from 'express';*/
import {
  readFile,
} from 'fs';
import {
  resolve,
} from 'path';
import {
  ServerResponse,
} from 'spdy';
import {
  promisify,
} from 'util';

// @ts-ignore
import glob from 'glob';
const globProm = promisify(glob);

const readFileProm = promisify(readFile);

const projectDirPath = resolve(__dirname, '..', '..');
const getClientFilepath = resolve.bind(null, __dirname, '..', 'client');

const handlePushError = (err: Error | undefined) => {
  if (err) {
    console.trace(err);
  }
};

const nodeSpdyOptions = {
  request: {
    accept: '*/*',
  },
};

/*const nodeSpdyJsonOptions = Object.assign({}, nodeSpdyOptions, {
  response: {
    'content-type': 'application/json',
    'content-encoding': 'gzip',
  },
});*/

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

const nodeSpdyFontOptions = Object.assign({}, nodeSpdyOptions, {
  response: {
    'content-type': 'font/woff2',
  },
});

export const serverPush = async ({
  /*req,*/
  res,
  scripts,
  stylesheets,
}: {
  /*req:         Request,*/
  res:         ServerResponse,
  scripts:     Array<string>,
  stylesheets: Array<string>,
}) => {
  /* Load and the vendor and built script chunks. */
  const scriptFiles = await (async () => {
    let values: Array<Buffer> = [];
    try {
      values = await Promise.all([
        readFileProm(getClientFilepath('vendor.js.gz')),
        ...scripts.map((fileName) => {
          const path = getClientFilepath(getClientFilepath(`${fileName}.gz`));
          return readFileProm(path);
        }),
      ]);
    } catch (e) {
      console.error('Problem pushing vendor file:');
      console.error(e);
      return values;
    }

    /* Push the vendor file to the client. Cannot execute if file loading fails. */
    const vendorStream = res.push('/static/vendor.js', nodeSpdyJsOptions);
    vendorStream.on('error', handlePushError);
    vendorStream.end(values[0]);

    return values;
  })();

  /* Push the built script chunks to the client. */
  for (let ii = 1; ii < scriptFiles.length; ii += 1) {
    const fileName = scripts[ii - 1];
    const stream = res.push(`/static/${fileName}`, nodeSpdyJsOptions);
    stream.on('error', handlePushError);
    stream.end(scriptFiles[ii]);
  }

  /* Load the built style chunks. */
  const styleFiles = await (async () => {
    try {
      return await Promise.all(stylesheets.map((path) => {
        return readFileProm(getClientFilepath(`${path}.gz`));
      }));
    } catch(e) {
      console.error('Problem pushing script file:');
      console.error(e);
      return [];
    }
  })();

  /* Push the built style chunks to the client. */
  styleFiles.forEach((file, index) => {
    const fileName = stylesheets[index];
    const stream = res.push(`/static/${fileName}`, nodeSpdyCssOptions);
    stream.on('error', handlePushError);
    stream.end(file);
  });

  /* Load the font files. Load WOFF2 only. If the browser doesn't have
    * WOFF2, it probably doesn't have HTTP2. */
  const fontGlob = resolve(projectDirPath, 'fonts') + '/*.woff2';
  const fontFilePaths: Array<string> = await globProm(fontGlob);
  const fontFiles = await (async () => {
    try {
      return await Promise.all(fontFilePaths.map((filePath) => {
        return readFileProm(filePath);
      }));
    } catch (e) {
      console.error('Problem pushing font file:');
      console.error(e);
      return [];
    }
  })();

  /* Push the font files to the client. */
  fontFiles.forEach((file, index) => {
    const filePath = fontFilePaths[index];
    const fileName = filePath.split('/').filter((aa) => aa).slice(-1)[0];
    const stream = res.push(`/fonts/${fileName}`, nodeSpdyFontOptions);
    stream.on('error', handlePushError);
    stream.end(file);
  });
};

export default serverPush;