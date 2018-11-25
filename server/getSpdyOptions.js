const {
  readFileSync,
} = require('fs');
const {
  join,
} = require('path');

const projectPath = join(__dirname, '..');
/* Directory with keys in it. Currently volumed with Docker from the host
 * filesystem. */
const letsEncryptDir = join(projectPath, 'private', 'live', 'hellox.me');

module.exports = {
  getSpdyOptions() {
    return {
      cert: readFileSync(join(letsEncryptDir, 'fullchain.pem')),
      key:  readFileSync(join(letsEncryptDir, 'privkey.pem')),
      spdy: {
        protocols: [
          'h2',
          'spdy/3.1',
          'spdy/3',
          'spdy/2',
          'http/1.1',
          'http/1.0',
        ],
      },
    };
  },
};