/**
 *  handle HTTP header configuration for security
 *  Use Helmet for http header configuration : https://helmetjs.github.io/docs/
 */

const helmet = require('helmet');
const cors = require('cors');

module.exports = (expressApp) => {

  //default configuration
  expressApp.use(helmet());

  // HTTP content security policy header
  expressApp.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['\'self\''], //Limit javascript to current domain
    }
  }));

  //CORS header
  expressApp.use(cors());
};
