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
    if (this.useCaseContainer.getAllCategoriesUsecase) {
      const getAllCategoriesUseCase = new this.useCaseContainer.getAllCategoriesUsecase();
      const {SUCCESS, ERROR} = getAllCategoriesUseCase.events;

      getAllCategoriesUseCase.on(SUCCESS, () => {
        res.status(Status.OK).send('Success API');
      });
      getAllCategoriesUseCase.execute();
    }
  }

}

module.exports = ApiRouter;
