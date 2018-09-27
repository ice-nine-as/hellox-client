const {
  join,
} = require('path');
const serveFavicon = require('serve-favicon');

const projectPath = join(__dirname, '..', '..');
const imagesPath  = join(projectPath, 'images');

exports = module.exports = {
  getFaviconMiddleware() {
    return serveFavicon(join(imagesPath, 'favicon-96x96.png'));
  },
};