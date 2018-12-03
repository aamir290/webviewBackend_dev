/**
 * Unit tests for keyword validation middleware
 */

const sinon = require('sinon');
const keywordParameterMiddleware = require('../../../../src/infrastructure/validation/keywordParameterMiddleware');

describe('keywordParameterMiddleware', () => {

  let stubRequest, stubResponse, stubNext;

  beforeEach(() => {
    stubRequest = {};
    stubRequest.params = {};

    stubResponse = {};
    stubResponse.status = sinon.stub();
    stubResponse.status.returns(stubResponse);
    stubResponse.end = sinon.stub();

    stubNext = sinon.stub();
  });

  context('when testing correct keyword', () => {
    it('call next with keyword 1 char',  () => {
      stubRequest.params.keyword = 'f';

      keywordParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });

    it('call next with keyword 8 char',  () => {
      stubRequest.params.keyword = 'finabank';

      keywordParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });

    it('call next with keyword alphanumeric',  () => {
      stubRequest.params.keyword = 'r86éa5d';

      keywordParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });
  });

  context('when testing incorrect keyword', () => {
    it('return 400 BAD Request with keyword with two words',  () => {
      stubRequest.params.keyword = 'fin abank';

      keywordParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledWith(400);
      stubResponse.end.should.have.been.called;
    });

    it('return 400 BAD Request with keyword with no alphanumeric words',  () => {
      stubRequest.params.keyword = 'fin*-aba@nk';

      keywordParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(400);
      stubResponse.end.should.have.been.calledOnce;
    });

    it('return 400 BAD Request with no params in req',  () => {
      keywordParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(400);
      stubResponse.end.should.have.been.calledOnce;
    });
  });

  afterEach(()=>{
    sinon.reset();
  });

});
