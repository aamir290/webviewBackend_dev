/**
 *  Configure and init main router component for application.
 *  Init middleware and routes.
 */

const express = require('express');
const path = require('path');

/**
 *
 * @param config configuration
 * @param requestLoggerFile middleware for logging request to file
 * @param requestLogger middleware for logging request to console
 * @param apiRouter router controller for api
 * @returns {*} application router
 */
module.exports = (config, requestLoggerFile, requestLogger, apiRouter) => {

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
  appRouter.use('/api', apiRouter);

  return appRouter;
};
