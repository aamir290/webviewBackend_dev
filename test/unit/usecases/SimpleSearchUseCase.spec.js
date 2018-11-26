/**
 * Unit tests for GetRootCategoriesUseCase
 */
const sinon = require('sinon');
const SimpleSearchUsecase = require('../../../src/usecases/SimpleSearchUseCase');
const ChatBotRepository = require('../../../src/data/ChatBotRepository');

describe('SimpleSearchUseCase', () => {

  let stubRepository, stubSearch, stubLogger;

  before(() => {
    stubSearch = sinon.stub();
    stubSearch.withArgs('ban').resolves({
      result: [
        {
          category: 'finabank',
          description: 'elue meilleure banque pour les jeunes',
          icon: 'https://upload.wikimedia.org/wikipedia/fr/0/09/Orange_Bank_2017.png',
          id: 'orangebank@botplatform.orange.fr',
          name: 'Orange Bank'
        },
        {
          category: 'finabank',
          description: 'oldest bank in town',
          icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/bank-icon.png',
          id: 'oldbank@botplatform.orange.fr',
          name: 'Old Bank'
        }]
    });
    stubSearch.withArgs('educ').rejects();
    stubSearch.withArgs('toto').resolves();

    stubRepository = sinon.createStubInstance(ChatBotRepository, {
      search: stubSearch,
    });

    stubLogger = {};
    stubLogger.debug = sinon.stub();
  });

  /*************************************************************************/

  context('when query is successful', () => {

    it('emits Success with array of chatbot when search succeeded', (done) => {
      const searchChatbots = new SimpleSearchUsecase(stubRepository, stubLogger);

      searchChatbots.on(searchChatbots.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      searchChatbots.on(searchChatbots.events.SUCCESS, (chatbotResult) => {
        stubSearch.should.have.been.calledOnce;

        chatbotResult.should.eql({
          result: [
            {
              category: 'finabank',
              description: 'elue meilleure banque pour les jeunes',
              icon: 'https://upload.wikimedia.org/wikipedia/fr/0/09/Orange_Bank_2017.png',
              id: 'orangebank@botplatform.orange.fr',
              name: 'Orange Bank'
            },
            {
              category: 'finabank',
              description: 'oldest bank in town',
              icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/bank-icon.png',
              id: 'oldbank@botplatform.orange.fr',
              name: 'Old Bank'
            }]
        });
        done();
      });

      searchChatbots.execute('ban');
    });

  });

  /*************************************************************************/

  context('when query is unsuccessful', () => {

    it('emits PARAMETER_ERROR when keyword is undefined', (done) => {
      const getChatbotCategory = new SimpleSearchUsecase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, (errorMessage) => {
        errorMessage.should.eql('Incorrect keyword parameter');
        done();
      });
      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });

      getChatbotCategory.execute();
    });

    it('emits PARAMETER_ERROR when error occurs with distant source', (done) => {
      const getChatbotCategory = new SimpleSearchUsecase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, () => {
        stubSearch.should.have.been.calledOnce;
        done();
      });
      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });

      getChatbotCategory.execute('educ');
    });

    it('emits PARAMETER_ERROR when distant source return undefined', (done) => {
      const getChatbotCategory = new SimpleSearchUsecase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, () => {
        stubSearch.should.have.been.calledOnce;
        done();
      });
      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });

      getChatbotCategory.execute('toto');
    });

  });

  context('when initializing', () => {
    it('throws error when no logger', (done) => {
      try {
        new SimpleSearchUsecase(stubRepository);
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
