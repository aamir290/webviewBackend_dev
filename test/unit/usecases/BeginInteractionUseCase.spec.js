/**
 * Unit tests for GetRootCategoriesUseCase
 */
const sinon = require('sinon');
const BeginInteractionUsecase = require('../../../src/usecases/BeginInteractionUseCase');
const ChatBotRepository = require('../../../src/data/ChatBotRepository');
const stubUtils = require('../../testData/stubUtils');

describe('BeginInteractionUsecase', () => {

  let stubRepository, stubLogger, stubGetChatBotId;

  before(() => {
    stubGetChatBotId = sinon.stub();
    stubGetChatBotId.withArgs('124587jihuij').rejects();
    stubGetChatBotId.withArgs('12jihuij').resolves(false);
    stubGetChatBotId.withArgs('afcon.chatbot.trials@orange.com').resolves(true);

    stubRepository = sinon.createStubInstance(ChatBotRepository, {
      getChatbotId: stubGetChatBotId,
    });

    stubLogger = stubUtils.createStubLogger();
  });

  /*************************************************************************/

  context('when query is successful', () => {

    it('emits Success with deeplink ', (done) => {
      const getDeeplink = new BeginInteractionUsecase(stubRepository, stubLogger);

      getDeeplink.on(getDeeplink.events.SUCCESS, (deeplinkResult) => {
        stubGetChatBotId.should.have.been.calledOnce;
        deeplinkResult.should.eql({result:'botgallery://open?abcdeid=bd0763197f509001666e9b9'});
        done();
      });

      getDeeplink.on(getDeeplink.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      getDeeplink.on(getDeeplink.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
      });


      getDeeplink.execute('afcon.chatbot.trials@orange.com', 'MSISDN', 'webbrowser');
    });

  });

  /*************************************************************************/

  context('when query is unsuccessful', () => {

    it('emits PARAMETER_ERROR when getChatBotId is incorrect', (done) => {
      const getDeeplink = new BeginInteractionUsecase(stubRepository, stubLogger);

      getDeeplink.on(getDeeplink.events.PARAMETER_ERROR, (errorMessage) => {
        errorMessage.should.eql('Incorrect chatbotid parameter');
        done();
      });
      getDeeplink.on(getDeeplink.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });
      getDeeplink.on(getDeeplink.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
      });

      getDeeplink.execute();
    });

    it('emits NOT_FOUND when getChatBotId not found', (done) => {
      const getDeeplink = new BeginInteractionUsecase(stubRepository, stubLogger);

      getDeeplink.on(getDeeplink.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });
      getDeeplink.on(getDeeplink.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      getDeeplink.on(getDeeplink.events.NOT_FOUND, () => {
        done();
      });

      getDeeplink.execute('toto@roange.fr');
    });

    it('emits PARAMETER_ERROR ', (done) => {
      const getDeeplink = new BeginInteractionUsecase(stubRepository, stubLogger);

      getDeeplink.on(getDeeplink.events.PARAMETER_ERROR, () => {
        getDeeplink.should.have.been.calledOnce;
        done();
      });
      getDeeplink.on(getDeeplink.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });
      getDeeplink.on(getDeeplink.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
      });

      getDeeplink.execute('123456789');
    });

  });

  context('when initializing', () => {
    it('throws error when no logger', (done) => {
      try {
        new BeginInteractionUsecase(stubRepository);
      }catch(e){
        done();
        return;
      }
      done('fail - no error thrown');
    });
  });


  afterEach(() => {
    // Restore the default sandbox here
    sinon.resetHistory();
  });
});
