/**
 * Middleware that handle validation of keyword parameter in request.
 * Sanitize parameter to.
 * Keyword is a string containing only a single word.
 * Accessible threw req.params.keyword
 */

const validator = require('validator');
const HTTPError = require('../error/HTTPError');

module.exports = function (req, res, next) {
  if(req && req.params && req.params.keyword){ //Parameter exists
    let paramKeyword = req.params.keyword;

    paramKeyword = validator.trim(paramKeyword);  //remove unused space

    if(paramKeyword.indexOf(' ') !== -1) {//only one word
      next(new HTTPError(400, 'Invalid keyword - must be one word'));
    }else{
      paramKeyword = validator.escape(paramKeyword);  //convert html char to html entities

      if(!validator.isAlphanumeric(paramKeyword)) {//only alphanum char
        next(new HTTPError(400, 'Invalid keyword - must be alphanumeric'));
      }else {
        req.params.keyword = paramKeyword;  //set sanitize param

        next();
      }
    }
  }else{
    next(new HTTPError(400, 'Invalid keyword - missing parameter'));
  }
};
