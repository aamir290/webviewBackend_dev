/**
 *  Configure and init router for api used in application.
 */

const express = require('express');
const path = require('path');
const Status = require('http-status');

/**
 *
 * @param useCaseContainer container that contains usecase
 * @returns {*} api router
 */
module.exports = (useCaseContainer) => {

  //Init router
  const appRouter = express.Router();

  //Init route
  appRouter.get('/api', function (req, res, next) {
    if (useCaseContainer && useCaseContainer.getAllCategoriesUsecase) {
      const getAllCategoriesUseCase = new useCaseContainer.getAllCategoriesUsecase();
      const {SUCCESS, ERROR} = getAllCategoriesUseCase.events;

      getAllCategoriesUseCase.on(SUCCESS, () => {
        console.log("OK event");
        res.status(Status.OK).send('Success API');
      });
      getAllCategoriesUseCase.execute();
    }
  });


  return appRouter;
};
