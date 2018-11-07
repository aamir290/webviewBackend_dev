/**
 *  Configure and init router component for application.
 *  Init middleware and routes.
 */

//Includes
const {Router} = require('express');

//Init router
const appRouter = Router();

appRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = appRouter;
