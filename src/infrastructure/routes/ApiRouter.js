/**
 *  Configure and init router for api used in application.
 */

const express = require('express');
const categoryValidationMiddleware = require('../validation/categoryParameterMiddleware');
const keywordValidationMiddleware = require('../validation/keywordParameterMiddleware');
const chatbotIdValidationMiddleware = require('../validation/chatbotIdParameterMiddleware');
const MSISDNValidationMiddleware = require('../validation/MSISDNParameterMiddleware');
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
    this.apiRouter.get('/getDefaultCategories/:accessChannel', this._getDefaultCategories.bind(this));
    this.apiRouter.get('/list/:accessChannel', this._getList.bind(this));
    this.apiRouter.get('/listCategory/:categoryId/:accessChannel', categoryValidationMiddleware, this._getListCategory.bind(this));
    this.apiRouter.get('/searchChatbots/:keyword/:accessChannel', keywordValidationMiddleware, this._search.bind(this));
    this.apiRouter.get('/searchChatbots/:keyword/:accessChannel/:categoryId', keywordValidationMiddleware, categoryValidationMiddleware, this._search.bind(this));
    this.apiRouter.get('/beginInteraction/:chatbotId/:MSISDN/:accessChannel', chatbotIdValidationMiddleware, MSISDNValidationMiddleware, this._beginInteraction.bind(this));
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
  async _getList(req, res, next) {
    if (this.useCaseContainer.getChatbotListUseCase) {
      const paramAccessChannel = req.params.accessChannel || 'webbrowser';
      const getChatbotListUseCase = new this.useCaseContainer.getChatbotListUseCase(this._chatBotRepository, this.logger);
      const {SUCCESS, NOT_FOUND} = getChatbotListUseCase.events;

      getChatbotListUseCase.on(SUCCESS, (chatbots) => {
        this.logger.debug('_getList - Success : ' + chatbots);
        return res
          .status(200)
          .json(chatbots);
      });

      getChatbotListUseCase.on(NOT_FOUND, () => {
        next(new HTTPError(404, 'Badly formatted parameters'));
      });
console.log("API router");
      await getChatbotListUseCase.execute(paramAccessChannel);
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
      const paramAccessChannel = req.params.accessChannel || 'webbrowser';
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

      await getChatbotInCategoryUseCase.execute(paramCategoryId, paramAccessChannel);
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
        const paramAccessChannel = req.params.accessChannel || 'webbrowser';
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

        await simpleSearchUseCase.execute(paramKeyword, paramCategoryId, paramAccessChannel);
      } else {
        //No params => parameter error
        next(new HTTPError(400, 'No param keyword'));
      }
    } else {
      next(new HTTPError(400, 'Missing usecase'));
    }
  }

  /**
   * handle request /beginInteraction/:chatbotId/:MSISDN/:accesChannel
   * @param req
   * @param res
   * @param next
   * @private
   */
  async _beginInteraction(req, res, next) {
    this.logger.debug('_beginInteraction - start');
    if (this.useCaseContainer.beginInteractionUseCase) {
      if (req.params && req.params.chatbotId && req.params.MSISDN && req.params.accessChannel) {
        const paramChatbotId = req.params.chatbotId;
        const paramMSISDN = req.params.MSISDN;
        const paramAccessChannel = req.params.accessChannel || 'webbrowser';

        const beginInteractionUseCase = new this.useCaseContainer.beginInteractionUseCase(this._chatBotRepository, this.logger);
        const {SUCCESS, NOT_FOUND, PARAMETER_ERROR} = beginInteractionUseCase.events;

        beginInteractionUseCase.on(SUCCESS, (ABCDE_id) => {
          this.logger.debug('_beginInteraction - Success : ' + ABCDE_id);
          return res
            .status(302)
            .json(ABCDE_id);
        });

        beginInteractionUseCase.on(PARAMETER_ERROR, () => {
          this.logger.debug('_beginInteraction - PARAMETER_ERROR');
          next(new HTTPError(400, 'Error with chatbot repository'));
        });

        beginInteractionUseCase.on(NOT_FOUND, () => {
          this.logger.debug('_search - NOT_FOUND');
          next(new HTTPError(404, 'Intent/Deeplink not found'));
        });

        await beginInteractionUseCase.execute(paramChatbotId, paramMSISDN, paramAccessChannel);
      } else {
        //No params => parameter error
        next(new HTTPError(400, 'No params chatbotId, MSISDN, accessChannel'));
      }
    } else {
      next(new HTTPError(400, 'Missing usecase'));
    }
  }
}

module.exports = ApiRouter;
