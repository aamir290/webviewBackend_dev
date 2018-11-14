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

  constructor(useCaseContainer, logger) {
    this.useCaseContainer = useCaseContainer || {};
    this.logger = logger;
    this.apiRouter = express.Router();

    this._setupRoutes();
  }

  _setupRoutes() {
    this.apiRouter.get('/api', this._index.bind(this));
  }

  _index(req, res, next) {
    if (this.useCaseContainer.getRootCategoriesUsecase) {
      const getRootCategoriesUseCase = this.useCaseContainer.getRootCategoriesUsecase;
      const {SUCCESS, ERROR} = getRootCategoriesUseCase.events;

      getRootCategoriesUseCase.on(SUCCESS, (categories) => {
        res
          .status(Status.OK)
          .json(categories);
      });

      getRootCategoriesUseCase.on(ERROR, ()=>{
        next();
      });

      getRootCategoriesUseCase.execute();
    }
  }

}

module.exports = ApiRouter;
