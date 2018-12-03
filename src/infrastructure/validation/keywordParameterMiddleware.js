/**
 * Middleware that handle validation of keyword parameter in request.
 * Sanitize parameter to.
 * Keyword is a string containing only a single word.
 * Accessible threw req.params.keyword
 */

const validator = require('validator');

module.exports = function (req, res, next) {
  if(req && req.params && req.params.keyword){ //Parameter exists
    let paramKeyword = req.params.keyword;

    paramKeyword = validator.trim(paramKeyword);  //remove unused space

    if(paramKeyword.indexOf(' ') !== -1) {//only one word
      _sendBadRequest(res);
    }

    paramKeyword = validator.escape(paramKeyword);  //convert html char to html entities

    if(!validator.isAlphanumeric(paramKeyword)) {//only alphanum char
      _sendBadRequest(res);
    }

    req.params.keyword = paramKeyword;  //set sanitize param

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
    .status(400)
    .end();
}
