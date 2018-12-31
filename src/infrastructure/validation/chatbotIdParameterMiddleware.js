/**
 * Middleware that handle validation of category parameter in request.
 * Sanitize parameter to
 * ChatbotId is an email
 * Accessible threw req.params.chatbotId
 */

const validator = require('validator');
const HTTPError = require('../error/HTTPError');

// TODO verify function

module.exports = function (req, res, next) {
  if(req && req.params && req.params.chatbotId){ //Parameter exists
    let paramCategoryId = validator.trim(req.params.chatbotId);  //remove unused space

    if(paramCategoryId.indexOf(' ') !== -1) {//only one word
      next(new HTTPError(400, 'Invalid chatbot id - must be one word'));
    }else if(!validator.isLength(paramCategoryId, {min:6, max:60})) {//chatbotId between 6 & 60 chars
      next(new HTTPError(400, 'Invalid chatbot id - id length must be between 6 and 60'));
    }else {
      req.params.chatbotId = paramCategoryId;  //set sanitize param
      next();
    }
  }else{
    next(new HTTPError(400, 'Invalid chatbot id - missing parameter'));
  }
};
