/**
 *  Configure and init router component for application.
 *  Init middleware and routes.
 */

const express = require('express');
const path = require('path');

/**
 *
 * @param config configuration
 * @param requestLoggerFile middleware for logging request to file
 * @param requestLogger middleware for logging request to console
 * @returns {*} application router
 */
module.exports = (config, requestLoggerFile, requestLogger) => {

  //Init router
  const appRouter = express.Router();

  //Add logger for request
  appRouter.use(requestLoggerFile);
  if(config.env === 'development') {
    appRouter.use(requestLogger);
  }

  //Static file and UI
  appRouter.use(express.static(path.resolve('public')));

  //API

  //Init route
  appRouter.get('/api', function (req, res, next) {
    res.send('respond with a resource');
  });


  return appRouter;
};
