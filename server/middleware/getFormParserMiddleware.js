const bodyParser = require('body-parser');

module.exports = {
  getFormParserMiddleware() {
    return bodyParser.urlencoded({ extended: true, });
  }
};