/* Cross-reference with StorySubmissionForm component. */

const google = require('googleapis').google;
const sheets = google.sheets('v4');

function publishToGoogleSheet(name, email, story, responses) {
  /* Should be copied locally for dev, or volumed in with Docker for prod. */
  const credentials = require('./credentials/google-sheets-credentials.json');
  const jwtClient =
    new google.auth.JWT(
      /* Client email. */
      credentials.client_email,
      /* Keyfile. Not used. */
      null,
      /* Private key. */
      credentials.private_key,
      /* Scopes. */
      [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
      ],
    );

  return new Promise((resolve, reject) => {
    // authenticate request
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
      } else {
        const request = {
          // The ID of the spreadsheet to update.
          spreadsheetId: '1tAtgMmJYC_HnNTknFxnHzzjrU8yhD33tWcueIoKDA-g',

          // The A1 notation of a range to search for a logical table of data.
          // Values will be appended after the last row of the table.
          range: 'A1:A1',

          // How the input data should be interpreted.
          valueInputOption: 'RAW',

          // How the input data should be inserted.
          insertDataOption: 'INSERT_ROWS',

          resource: {
            values: [
              [
                name,
                email,
                /* [2] is Rating, which should be filled in, after reading, by
                 * editors. */
                ' ',
                story,
                /* [4] is Keywords, which should be filled in, after reading,
                 * by editors. */
                ' ',
                /* [5] is Comments, which should be filled in, after reading,
                 * by editors. */
                ' ',
                new Date(),
                responses,
              ],
            ],
          },

          auth: jwtClient,
        };

        sheets.spreadsheets.values.append(request, (err, response) => {
          if (err) {
            reject(err);
          }

          resolve();
        });
      }
    });
  });
}

module.exports = {
  publishToGoogleSheet,
};