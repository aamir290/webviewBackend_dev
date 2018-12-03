/**
 *  Configure and init router for api used in application.
 */

const express = require('express');
const categoryValidationMiddleware = require('../validation/categoryParameterMiddleware');

/**
 *
 * @param useCaseContainer container that contains usecase
 * @returns {*} api router
 */
class ApiRouter {

  constructor(useCaseContainer, chatBotRepository, logger) {
    this.useCaseContainer = useCaseContainer || {};

    if(!logger) throw new Error('Missing logger');
    this.logger = logger;

    this.apiRouter = express.Router();
    this._chatBotRepository = chatBotRepository;

    this._setupRoutes();
  }

  _setupRoutes() {
    this.apiRouter.get('/getDefaultCategories', this._getDefaultCategories.bind(this));
    this.apiRouter.get('/listCategory', categoryValidationMiddleware, this._getListCategory.bind(this));
    this.apiRouter.get('/listCategory/:categoryId', categoryValidationMiddleware, this._getListCategory.bind(this));
    this.apiRouter.get('/search/:keyword', this._search.bind(this));
    this.apiRouter.get('/search', this._search.bind(this));
  }

  /**
   * handle request /getDefaultCategories
   * @param req
   * @param res
   * @param next
   * @private
   */
  _getDefaultCategories(req, res, next) {
    if (this.useCaseContainer.getRootCategoriesUsecase) {
      const getRootCategoriesUseCase = new this.useCaseContainer.getRootCategoriesUsecase(this._chatBotRepository);
      const {SUCCESS, ERROR} = getRootCategoriesUseCase.events;

      getRootCategoriesUseCase.on(SUCCESS, (categories) => {
        res
          .status(200)
          .json(categories);
      });

      getRootCategoriesUseCase.on(ERROR, ()=>{
        this.constructor._sendBadRequest(res);
      });

      getRootCategoriesUseCase.execute();
    }else{
      this.constructor._sendBadRequest(res);
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
      if(req.params && req.params.categoryId){
        const paramCategoryId = req.params.categoryId;
        const getChatbotInCategoryUseCase = new this.useCaseContainer.getChatbotInCategoryUseCase(this._chatBotRepository, this.logger);
        const {SUCCESS, NOT_FOUND, PARAMETER_ERROR} = getChatbotInCategoryUseCase.events;

        getChatbotInCategoryUseCase.on(SUCCESS, (chatbots) => {
          this.logger.debug('_getListCategory - Success : '+chatbots);
          return res
            .status(200)
            .json(chatbots);
        });

        getChatbotInCategoryUseCase.on(NOT_FOUND, ()=>{
          return res
            .status(404)
            .end();
        });

        getChatbotInCategoryUseCase.on(PARAMETER_ERROR, ()=> {
          this.logger.debug('_getListCategory - PARAMETER_ERROR');
          return this.constructor._sendBadRequest(res);
        });

        await getChatbotInCategoryUseCase.execute(paramCategoryId);
      }else{
        //No params => parameter error
        this.constructor._sendBadRequest(res);
      }
    }else{
      this.constructor._sendBadRequest(res);
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
      if(req.params && req.params.keyword){
        const paramKeyword = req.params.keyword;
        const simpleSearchUseCase = new this.useCaseContainer.simpleSearchUseCase(this._chatBotRepository, this.logger);
        const {SUCCESS, PARAMETER_ERROR} = simpleSearchUseCase.events;

        simpleSearchUseCase.on(SUCCESS, (chatbots) => {
          this.logger.debug('_getListCategory - Success : '+chatbots);
          return res
            .status(200)
            .json(chatbots);
        });

        simpleSearchUseCase.on(PARAMETER_ERROR, ()=> {
          this.logger.debug('_getListCategory - PARAMETER_ERROR');
          return this.constructor._sendBadRequest(res);
        });

        await simpleSearchUseCase.execute(paramKeyword);
      }else{
        //No params => parameter error
        this.constructor._sendBadRequest(res);
      }
    }else{
      this.constructor._sendBadRequest(res);
    }
  }

  /**
   * Return response 400 for bad request.
   * @param res
   * @private
   */
  static _sendBadRequest(res){
    res
      .status(400)
      .end();
  }

}

module.exports = ApiRouter;
