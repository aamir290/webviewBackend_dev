/**
 *  Configure and init router for api used in application.
 */

const express = require('express');
const categoryValidationMiddleware = require('../validation/categoryParameterMiddleware');
const keywordValidationMiddleware = require('../validation/keywordParameterMiddleware');
const HTTPError = require('../error/HTTPError');

/**
 *
 * @param useCaseContainer container that contains usecase
 * @returns {*} api router
 */
class ApiRouter {

  constructor(useCaseContainer, chatBotRepository, logger) {
    this.useCaseContainer = useCaseContainer || {};

    if (!logger) throw new Error('Missing logger');
    this.logger = logger;

    this.apiRouter = express.Router();
    this._chatBotRepository = chatBotRepository;

    this._setupRoutes();
  }

  _setupRoutes() {
    this.apiRouter.get('/getDefaultCategories', this._getDefaultCategories.bind(this));
    this.apiRouter.get('/getDefaultCategories/:accessChannel', this._getDefaultCategories.bind(this));
    this.apiRouter.get('/listCategory', this._getListCategory.bind(this));
    this.apiRouter.get('/listCategory/:categoryId', categoryValidationMiddleware, this._getListCategory.bind(this));
    this.apiRouter.get('/listCategory/:categoryId/:accessChannel', categoryValidationMiddleware, this._getListCategory.bind(this));
    this.apiRouter.get('/searchChatbot', this._search.bind(this));
    this.apiRouter.get('/searchChatbot/:keyword', keywordValidationMiddleware, this._search.bind(this));
    this.apiRouter.get('/searchChatbot/:keyword/:accessChannel/:categoryId', keywordValidationMiddleware, categoryValidationMiddleware, this._search.bind(this));
    //TODO verify
    this.apiRouter.get('/beginInteraction/:chatbotId/:MSISDN/:accesChannel', chatbotIdValidationMiddleware, MSISDNValidationMiddleware, this._beginInteraction.bind(this));
  }

  /**
   * handle request /getDefaultCategories
   * @param req
   * @param res
   * @param next
   * @private
   */
  _getDefaultCategories(req, res, next) {
    if (this.useCaseContainer.getCategoriesUsecase) {
      const getCategoriesUsecase = new this.useCaseContainer.getCategoriesUsecase(this._chatBotRepository);
      const {SUCCESS, ERROR} = getCategoriesUsecase.events;

      getCategoriesUsecase.on(SUCCESS, (categories) => {
        res
          .status(200)
          .json(categories);
      });

      getCategoriesUsecase.on(ERROR, () => {
        next(new HTTPError(400, 'Error while retrieving categories'));
      });

      getCategoriesUsecase.execute();
    } else {
      next(new HTTPError(400, 'Missing usecase'));
    }
  }

  /**
   * handle request /listCategory
   * @param req
   * @param res
   * @param next
   * @private
   */
  async _getListCategory(req, res, next) {
    if (this.useCaseContainer.getChatbotInCategoryUseCase) {
      const paramCategoryId = req.params.categoryId;
      const getChatbotInCategoryUseCase = new this.useCaseContainer.getChatbotInCategoryUseCase(this._chatBotRepository, this.logger);
      const {SUCCESS, NOT_FOUND, PARAMETER_ERROR} = getChatbotInCategoryUseCase.events;

      getChatbotInCategoryUseCase.on(SUCCESS, (chatbots) => {
        this.logger.debug('_getListCategory - Success : ' + chatbots);
        return res
          .status(200)
          .json(chatbots);
      });

      getChatbotInCategoryUseCase.on(NOT_FOUND, () => {
        next(new HTTPError(404, 'category not found'));
      });

      getChatbotInCategoryUseCase.on(PARAMETER_ERROR, () => {
        this.logger.debug('_getListCategory - PARAMETER_ERROR');
        next(new HTTPError(400, 'Error with chatbot repository'));
      });

      await getChatbotInCategoryUseCase.execute(paramCategoryId);
    } else {
      next(new HTTPError(400, 'Missing usecase'));
    }
  }

  /**
   * handle request /search/:keyword
   * @param req
   * @param res
   * @param next
   * @private
   */
  async _search(req, res, next) {
    if (this.useCaseContainer.simpleSearchUseCase) {
      if (req.params && req.params.keyword) {
        const paramKeyword = req.params.keyword;
        const paramCategoryId = req.params.categoryId;
        const simpleSearchUseCase = new this.useCaseContainer.simpleSearchUseCase(this._chatBotRepository, this.logger);
        const {SUCCESS, NOT_FOUND, PARAMETER_ERROR} = simpleSearchUseCase.events;

        simpleSearchUseCase.on(SUCCESS, (chatbots) => {
          this.logger.debug('_search - Success : ' + chatbots);
          return res
            .status(200)
            .json(chatbots);
        });

        simpleSearchUseCase.on(PARAMETER_ERROR, () => {
          this.logger.debug('_search - PARAMETER_ERROR');
          next(new HTTPError(400, 'Error with chatbot repository'));
        });

        simpleSearchUseCase.on(NOT_FOUND, () => {
          this.logger.debug('_search - NOT_FOUND');
          next(new HTTPError(404, 'category not found'));
        });

        await simpleSearchUseCase.execute(paramKeyword, paramCategoryId);
      } else {
        //No params => parameter error
        next(new HTTPError(400, 'No param keyword'));
      }
    } else {
      next(new HTTPError(400, 'Missing usecase'));
    }
  }
}

module.exports = ApiRouter;
