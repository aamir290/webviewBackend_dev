/**
 *  Configure and init router component for application.
 *  Init middleware and routes.
 */

//Includes
const {Router} = require('express');

/**
 *
 * @param config configuration
 * @param requestLoggerFile middleware for logging request to file
 * @param requestLogger middleware for logging request to console
 * @returns {*} application router
 */
module.exports = (config, requestLoggerFile, requestLogger) => {

  //Init router
  const appRouter = Router();

  //Add logger for request
  appRouter.use(requestLoggerFile);
  if(config.env === 'development') {
    appRouter.use(requestLogger);
  }

  //Init route
  appRouter.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });


  return appRouter;
};
