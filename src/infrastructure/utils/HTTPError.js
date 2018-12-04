const validator = require('validator');

/**
 * Specific class for generating http errors.
 */
class HTTPError extends Error {

  /**
   * Create error
   * @param status http status code
   * @param params other error message
   */
  constructor (status = 400, ...params){
    super(params);

    if(!validator.isInt(status) ) throw new Error('Incorrect use of HTTPError');
    this.status = status;
  }
}

module.exports = HTTPError;
