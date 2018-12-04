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

    if(!Number.isInteger(status) && (status < 0 || status > 600)) throw new Error('Incorrect use of HTTPError - invalid status');
    this.status = status;
  }
}

module.exports = HTTPError;
