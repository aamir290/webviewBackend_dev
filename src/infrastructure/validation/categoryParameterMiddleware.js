/**
 * Middleware that handle validation of category parameter in request.
 * Sanitize parameter to
 */

const validator = require('validator');
const Status = require('http-status');

module.exports = function (req, res, next) {
  if(req && req.params && req.params.categoryId){ //Parameter exists
    let paramCategoryId = req.params.categoryId;

    paramCategoryId = validator.trim(paramCategoryId);  //remove unused space
    paramCategoryId = validator.escape(paramCategoryId);  //convert html char to html entities

    if(!validator.isAlpha(paramCategoryId)) {//only alpha char
      _sendBadRequest(res);
    }

    if(!validator.isLength(paramCategoryId, {min:4, max:8})) {//category name between 4 & 8
      _sendBadRequest(res);
    }

    req.params.categoryId = paramCategoryId;  //set sanitize param

    next();
  }else{
    _sendBadRequest(res);
  }
};

/**
 * Return response 400 for bad request.
 * @param res
 * @private
 */
function _sendBadRequest(res) {
  res
    .status(Status.BAD_REQUEST)
    .end();
}
