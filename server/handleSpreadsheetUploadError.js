module.exports = {  
  handleSheetsError(e) {
    console.error('Problem publishing generated story to Google Sheets.');
    console.error(e);
  },
};