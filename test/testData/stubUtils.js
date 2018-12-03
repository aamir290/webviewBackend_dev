/**
 *  Methods for creating common stubs shared in all test
 */

const sinon = require('sinon');

/**
 * Return stub logger
 */
module.exports.createStubLogger = ()=> {
  const stubLogger = {};
  stubLogger.error = sinon.stub();
  stubLogger.debug = sinon.stub();

  return stubLogger;
};

/**
 * Create default stub request object
 */
module.exports.createStubRequest = ()=> {
  const stubRequest = {};
  stubRequest.params = {};

  return stubRequest;
};

/**
 * Create default response object
 */
module.exports.createStubResponse = ()=> {
  const stubResponse = {};
  stubResponse.status = sinon.stub();
  stubResponse.status.returns(stubResponse);
  stubResponse.end = sinon.stub();

  return stubResponse;
};
