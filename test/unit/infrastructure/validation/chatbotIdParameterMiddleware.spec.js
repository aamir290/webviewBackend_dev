/**
 * Unit tests for chatbot Id validation middleware
 */

const sinon = require('sinon');
const chatbotIdParameterMiddleware = require('../../../../src/infrastructure/validation/chatbotIdParameterMiddleware');
const stubUtils = require('../../../testData/stubUtils');

describe('chatbotIdParameterMiddleware', () => {

  let stubRequest, stubResponse, stubNext;

  beforeEach(() => {
    stubRequest = stubUtils.createStubRequest();
    stubResponse = stubUtils.createStubResponse();
    stubNext = sinon.stub();
  });

  context('when testing correct chatbot id', () => {
    it('call next with chatbot id 1 char',  () => {
      stubRequest.params.chatbotId = 'f';

      chatbotIdParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });

    it('call next with chatbot id 8 char',  () => {
      stubRequest.params.chatbotId = 'finabank';

      chatbotIdParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });

    it('call next with chatbot id alphanumeric',  () => {
      stubRequest.params.chatbotId = 'r86éa5d';

      chatbotIdParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });
  });

  context('when testing incorrect chatbot id', () => {
    it('return 400 BAD Request with chatbot id with two words',  () => {
      stubRequest.params.chatbotId = 'fin abank';

      chatbotIdParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid chatbot id - must be one word');
    });

    it('return 400 BAD Request with no params in req',  () => {
      chatbotIdParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid chatbot id - missing parameter');
    });
  });

  afterEach(()=>{
    sinon.reset();
  });

});
