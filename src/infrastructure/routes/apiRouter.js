/**
 *  Configure and init router for api used in application.
 */

const express = require('express');
const Status = require('http-status');

/**
 *
 * @param useCaseContainer container that contains usecase
 * @returns {*} api router
 */
class ApiRouter {

  constructor(useCaseContainer){
    this.useCaseContainer = useCaseContainer;
    this.apiRouter = express.Router();

    //Init route
    this.apiRouter.get('/api', function (req, res, next) {
      if (useCaseContainer && useCaseContainer.getAllCategoriesUsecase) {
        const getAllCategoriesUseCase = new useCaseContainer.getAllCategoriesUsecase();
        const {SUCCESS, ERROR} = getAllCategoriesUseCase.events;

        getAllCategoriesUseCase.on(SUCCESS, () => {
          res.status(Status.OK).send('Success API');
        });
        getAllCategoriesUseCase.execute();
      }
    });
  }



}

module.exports = ApiRouter;

// module.exports = (useCaseContainer) => {
//
//   //Init router
//   const appRouter = express.Router();
//
//   //Init route
//   appRouter.get('/api', function (req, res, next) {
//     if (useCaseContainer && useCaseContainer.getAllCategoriesUsecase) {
//       const getAllCategoriesUseCase = new useCaseContainer.getAllCategoriesUsecase();
//       const {SUCCESS, ERROR} = getAllCategoriesUseCase.events;
//
//       getAllCategoriesUseCase.on(SUCCESS, () => {
//         res.status(Status.OK).send('Success API');
//       });
//       getAllCategoriesUseCase.execute();
//     }
//   });
//
//
//   return appRouter;
// };
