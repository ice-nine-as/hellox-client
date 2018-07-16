exports = module.exports = {
  getHeaderMiddleware() {
    return (req, res, next) => {
      /* Give the service worker root scope. */
      res.setHeader('Service-Worker-Allowed', '/');
    
      if (req.path === '/') {
        res.setHeader('Cache-Control', 'no-cache');
      } else if (req.path === '/static/sw.js') {
        /* Only cache the service worker for 5 seconds. */
        res.setHeader('Cache-Control', 'max-age=5');
      } else if (/\.(js|css)$/.test(req.path) ||
                 /\.woff2?$/.test(req.path))
      {
        /* Cache all scripts, styles, and fonts for one year. */
        res.setHeader('Cache-Control', 'max-age=31536000');
      } 
    
      /* Deny HTTP entirely. */
      res.setHeader('Strict-Transport-Security',
                    'max-age=31536000 ; includeSubDomains');
    
      /* Deny all iframes/iframing of the site. */
      res.setHeader('X-Frame-Options', 'deny');
    
      /* Block all detected XSS attacks entirely. */
      res.setHeader('X-XSS-Protection', '1; mode=block');
    
      /* Execute the next middleware. */
      next();
    };
  },
};