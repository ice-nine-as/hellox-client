module.exports = {
  getGoogleAnalyticsMiddleware() {
    return (req, res) => {
      res.write('google-site-verification: google2121db82d9189338.html');
      res.end();
    };
  },
};