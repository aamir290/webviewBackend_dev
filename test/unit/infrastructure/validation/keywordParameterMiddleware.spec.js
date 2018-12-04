/**
 * Unit tests for keyword validation middleware
 */

const sinon = require('sinon');
const keywordParameterMiddleware = require('../../../../src/infrastructure/validation/keywordParameterMiddleware');
const stubUtils = require('../../../testData/stubUtils');

describe('keywordParameterMiddleware', () => {

  let stubRequest, stubResponse, stubNext;

  beforeEach(() => {
    stubRequest = stubUtils.createStubRequest();
    stubResponse = stubUtils.createStubResponse();
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

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid keyword - must be one word');
    });

    it('return 400 BAD Request with keyword with no alphanumeric words',  () => {
      stubRequest.params.keyword = 'fin*-aba@nk';

      keywordParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid keyword - must be alphanumeric');
    });

    it('return 400 BAD Request with no params in req',  () => {
      keywordParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid keyword - missing parameter');
    });
  });

  afterEach(()=>{
    sinon.reset();
  });

});
