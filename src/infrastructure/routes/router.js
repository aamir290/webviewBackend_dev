/**
 *  Configure and init router component for application.
 *  Init middleware and routes.
 */

//Includes
const {Router} = require('express');

module.exports = (requestLoggerFile) => {

  //Init router
  const appRouter = Router();

  //Add logger for request
  appRouter.use(requestLoggerFile);

  //Init route
  appRouter.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });


  return appRouter;
};
