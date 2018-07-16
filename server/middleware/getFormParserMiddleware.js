const bodyParser = require('body-parser');

exports = module.exports = {
  getFormParserMiddleware() {
    return bodyParser.urlencoded({ extended: true, });
  }
};