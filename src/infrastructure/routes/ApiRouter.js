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
      const getRootCategoriesUseCase = this.useCaseContainer.getRootCategoriesUsecase;
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
   * handle request /litsCategory
   * @param req
   * @param res
   * @param next
   * @private
   */
  _getListCategory(req, res, next) {
    if (this.useCaseContainer.getChatbotInCategoryUseCase) {
      if(req.params && req.params.categoryId){

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
      .send();
  }

}

module.exports = ApiRouter;
