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
  getHeaderMiddleware,
} = require('./getHeaderMiddleware');
const {
  getStoryGeneratorMailerMiddleware,
} = require('./getStoryGeneratorMailerMiddleware');

exports = module.exports = {
  applyMiddlewares(app) {
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
    app.get('/google2121db82d9189338.html', (req, res) => {
      res.write('google-site-verification: google2121db82d9189338.html');
      res.end();
    });
  },
};