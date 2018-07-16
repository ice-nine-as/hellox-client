exports = module.exports = {
  handleEmailSendingError(e, res) {
    console.error('Problem e-mailing generated story.');
    console.error(e);
    res.status(500);
    res.setHeader('content-type', 'content-type: text/plain; charset=utf-8');
    res.write(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Hello X E-mail error</title>
        </head>

        <body>
          <h3>
            Sorry, there was a problem e-mailing the generated story.
          </h3>

          <p>
            We've enclosed a copy of it below, in case you were expecting an e-mail.
          </p>

          <p>
            Or go back to the <strong><a href="/">homepage</a></strong>.
          </p>

          <h4>
            Your story
          </h4>

          <p>
            ${req.body.story.replace(/\n/g, '<br>')}
          </p>
        </body>`);

    res.end();
  },
};