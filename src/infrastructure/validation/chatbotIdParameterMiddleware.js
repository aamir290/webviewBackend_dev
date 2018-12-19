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
    let paramChatbotId = req.params.chatbotId;

    paramChatbotId = validator.trim(paramChatbotId);  //remove unused space

    if(!validator.isEmail(paramCategoryId)) {//verify if email adress
      next(new HTTPError(400, 'Invalid Chatbot Id - not email adress'));
    }else if(!validator.isLength(paramCategoryId, {min:6, max:60})) {//chatbotId between 6 & 60
      next(new HTTPError(400, 'Invalid Chatbot Id - id length must be between 6 and 60'));
    }else {
      req.params.chatbotId = paramCategoryId;  //set sanitize param
      next();
    }
  }else{
    next(new HTTPError(400, 'Invalid Chatbot Id - Missing parameter'));
  }
};
