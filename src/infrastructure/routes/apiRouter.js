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

  constructor(useCaseContainer, chatBotRepository, logger) {
    this.useCaseContainer = useCaseContainer || {};
    this.chatBotRepository = chatBotRepository;
    this.logger = logger;
    this.apiRouter = express.Router();

    this._setupRoutes();
  }

  _setupRoutes() {
    this.apiRouter.get('/api', this._index.bind(this));
  }

  _index(req, res, next) {
    if (this.useCaseContainer.getRootCategoriesUsecase) {
      const getAllCategoriesUseCase = new this.useCaseContainer.getRootCategoriesUsecase(this.chatBotRepository);
      const {SUCCESS, ERROR} = getAllCategoriesUseCase.events;

      getAllCategoriesUseCase.on(SUCCESS, (categories) => {
        this.logger.debug(categories);
        res
          .status(Status.OK)
          .json(categories);
      });

      getAllCategoriesUseCase.execute();
    }
  }

}

module.exports = ApiRouter;
