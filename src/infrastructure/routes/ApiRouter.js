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
    this.logger = logger;
    this.apiRouter = express.Router();
    this._chatBotRepository = chatBotRepository;

    this._setupRoutes();
  }

  _setupRoutes() {
    this.apiRouter.get('/getDefaultCategories', this._getDefaultCategories.bind(this));
    this.apiRouter.get('/listCategory', this._getListCategory.bind(this));
    this.apiRouter.get('/listCategory/:categoryId', this._getListCategory.bind(this));
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
          .status(Status.OK)
          .json(categories);
      });

      getRootCategoriesUseCase.on(ERROR, ()=>{
        this._sendBadRequest(res);
      });

      getRootCategoriesUseCase.execute();
    }else{
      this._sendBadRequest(res);
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
        const getChatbotInCategoryUseCase = new this.useCaseContainer.getChatbotInCategoryUseCase(this._chatBotRepository);
        const {SUCCESS, NOT_FOUND, PARAMETER_ERROR} = getChatbotInCategoryUseCase.events;

        getChatbotInCategoryUseCase.on(SUCCESS, (chatbots) => {
          return res
            .status(Status.OK)
            .json(chatbots);
        });

        getChatbotInCategoryUseCase.on(NOT_FOUND, ()=>{
          return res
            .status(Status.NOT_FOUND)
            .end();
        });

        getChatbotInCategoryUseCase.on(PARAMETER_ERROR, ()=>{
          return this._sendBadRequest(res);
        });

        await getChatbotInCategoryUseCase.execute(paramCategoryId);
      }else{
        //No params => parameter error
        this._sendBadRequest(res);
      }
    }else{
      this._sendBadRequest(res);
    }
  }

  /**
   * Return response 400 for bad request.
   * @param res
   * @private
   */
  _sendBadRequest(res){
    res
      .status(Status.BAD_REQUEST)
      .end();
  }

}

module.exports = ApiRouter;
