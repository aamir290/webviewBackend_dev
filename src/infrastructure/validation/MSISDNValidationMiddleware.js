/**
 * Middleware that handle validation of category parameter in request.
 * Sanitize parameter to
 * MSISDN is an international phone number whitout "+"
 * More data about MSISDN here https://www.cm.com/fr-fr/blog/comment-convertir-des-numeros-de-telephones-en-format-international/
 * Accessible threw req.params.MSISDN
 */

const validator = require('validator');
const HTTPError = require('../error/HTTPError');

// TODO verify function

module.exports = function (req, res, next) {
  if(req && req.params && req.params.MSISDN){ //Parameter exists
    let paramMSISDNuser = req.params.MSISDN;

    paramMSISDNuser = validator.trim(paramMSISDNuser);  //remove unused space

    if(!validator.isNumeric(paramMSISDNuser)) {//verify if parm is numeric value
      next(new HTTPError(400, 'Invalid MSISDN - MSISDN is\'t numeric only'));
    }else if(!validator.isLength(paramMSISDNuser, {min:3, max:15})) {//MSISDN between 3 & 15 
      next(new HTTPError(400, 'Invalid MSISDN - length must be between 3 and 15'));
    }else {
      req.params.MSISDN = paramMSISDNuser;  //set sanitize param
      next();
    }
  }else{
    next(new HTTPError(400, 'Invalid MSISDN - Missing parameter'));
  }
};
