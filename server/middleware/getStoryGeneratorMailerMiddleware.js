const {
  handleEmailSendingError,
} = require('../handleEmailSendingError');
const {
  handleSpreadsheetUploadError,
} = require('../handleSpreadsheetUploadError');

exports = module.exports = {
  getStoryGeneratorMailerMiddleware() {
    return (req, res) => {
      /* Cross-reference with StorySubmissionForm component. */

      const sheetProm = publishToGoogleSheet(
        req.body.name,
        req.body.email,
        req.body.story);

      sheetProm.then(
        () => {},
        handleSpreadsheetUploadError,
      );

      const emailProm = publishToEmail(
        req.body.name,
        req.body.email,
        req.body.carbonCopy,
        req.body.story);

      emailProm.then(
        () => {},
        handleEmailSendingError,
      );

      Promise.all([
        sheetProm,
        emailProm,
      ]).then(
        () => {
          /* Redirect to the home page. */
          res.redirect('/');
          res.end();
        },

        () => {},
      );
    }
  },
};