/**
 * Middleware that handle validation of category parameter in request.
 * Sanitize parameter to
 */

const validator = require('validator');

module.exports = function (req, res, next) {
  if(req && req.params && req.params.categoryId){ //Parameter exists
    let paramCategoryId = req.params.categoryId;

    paramCategoryId = validator.trim(paramCategoryId);  //remove unused space
    paramCategoryId = validator.escape(paramCategoryId);  //convert html char to html entities

    if(!validator.isAlpha(paramCategoryId)) {//only alpha char
      next('error');
    }

    if(!validator.isLength(paramCategoryId, {min:4, max:8})) {//category name between 4 & 8
      next('error');
    }

    req.params.categoryId = paramCategoryId;  //set sanitize param

    next();
  }else{
    next('error');
  }
};

/**
 * Return response 400 for bad request.
 * @param res
 * @private
 */
function _sendBadRequest(res) {
  res
    .status(400)
    .end();
}
