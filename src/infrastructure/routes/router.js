/**
 *  Configure and init router component for application.
 *  Init middleware and routes.
 */

//Includes
const {Router} = require('express');

/**
 *
 * @param requestLoggerFile middleware for logging request to file
 * @param requestLogger middleware for logging request to console
 * @returns {*} application router
 */
module.exports = (requestLoggerFile, requestLogger) => {

  //Init router
  const appRouter = Router();

  //Add logger for request
  appRouter.use(requestLoggerFile);
  appRouter.use(requestLogger);

  //Init route
  appRouter.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });


  return appRouter;
};
