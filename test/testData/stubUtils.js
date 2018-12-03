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
