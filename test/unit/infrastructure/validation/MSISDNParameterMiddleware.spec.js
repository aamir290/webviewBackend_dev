/**
 * Unit tests for MSISDN validation middleware
 */

const sinon = require('sinon');
const MSISDNParameterMiddleware = require('../../../../src/infrastructure/validation/MSISDNParameterMiddleware');
const stubUtils = require('../../../testData/stubUtils');

describe('MSISDNParameterMiddleware', () => {

  let stubRequest, stubResponse, stubNext;

  beforeEach(() => {
    stubRequest = stubUtils.createStubRequest();
    stubResponse = stubUtils.createStubResponse();
    stubNext = sinon.stub();
  });

  context('when testing correct MSISDN', () => {
    it('call next with MSISDN 8 numeric',  () => {
      stubRequest.params.MSISDN = '12345678';

      MSISDNParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });
  });

  context('when testing incorrect MSISDN', () => {
    it('return 400 BAD Request with MSISDN with no numeric words',  () => {
      stubRequest.params.MSISDN = 'fin*-aba@nk';

      MSISDNParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid MSISDN - must be numeric only');
    });

    it('return 400 BAD Request with MSISDN with 2 numeric',  () => {
      stubRequest.params.MSISDN = '12';

      MSISDNParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid MSISDN - length must be between 3 and 15');
    });

    it('return 400 BAD Request with no params in req',  () => {
      MSISDNParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid MSISDN - Missing parameter');
    });
  });

  afterEach(()=>{
    sinon.reset();
  });

});
