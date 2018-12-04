/**
 * Middleware that handle validation of category parameter in request.
 * Sanitize parameter to
 */

const validator = require('validator');
const HTTPError = require('../error/HTTPError');

module.exports = function (req, res, next) {
  if(req && req.params && req.params.categoryId){ //Parameter exists
    let paramCategoryId = req.params.categoryId;

    paramCategoryId = validator.trim(paramCategoryId);  //remove unused space
    paramCategoryId = validator.escape(paramCategoryId);  //convert html char to html entities

    if(!validator.isAlpha(paramCategoryId)) {//only alpha char
      next(new HTTPError(400, 'Invalid Category Id - not alpha only'));
    }

    if(!validator.isLength(paramCategoryId, {min:4, max:8})) {//category name between 4 & 8
      next(new HTTPError(400, 'Invalid Category Id - id length must be between 4 and 8'));
    }

    req.params.categoryId = paramCategoryId;  //set sanitize param

    next();
  }else{
    next(new HTTPError(400, 'Invalid Category Id - Missing parameter'));
  }
};
