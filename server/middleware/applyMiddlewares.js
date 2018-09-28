const {
  getFaviconMiddleware,
} = require('./getFaviconMiddleware');
const {
  getFontsStaticMiddleware,
} = require('./getFontsStaticMiddleware');
const {
  getFormParserMiddleware,
} = require('./getFormParserMiddleware');
const {
  getGoogleAnalyticsMiddleware,
} = require('./getGoogleAnalyticsMiddleware');
const {
  getHeaderMiddleware,
} = require('./getHeaderMiddleware');
const {
  getStoryGeneratorMailerMiddleware,
} = require('./getStoryGeneratorMailerMiddleware');
const morgan = require('morgan');

exports = module.exports = {
  applyMiddlewares(app) {
    /* Logging middleware. */
    app.use(morgan('combined', {
      /* Logs on request rather than response, which allows logs to be written
       * even if the request crashes the server. Comment this out if you want
       * response logging as well.
      immediate: true,*/
    })),

    /* Header middleware. */
    app.use(getHeaderMiddleware());

    /* Favicon middleware. */
    app.use(getFaviconMiddleware());

    /* Fonts static file middleware. */
    app.use('/fonts', getFontsStaticMiddleware());

    /* Form parser middleware. */
    app.use(getFormParserMiddleware());

    /* Mail endpoint for story generator */
    app.post('/story-generator-mailer', getStoryGeneratorMailerMiddleware());

    /* Google Analytics ownership endpoint */
    app.get('/google2121db82d9189338.html', getGoogleAnalyticsMiddleware());
  },
};