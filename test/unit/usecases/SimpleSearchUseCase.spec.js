/**
 * Unit tests for GetRootCategoriesUseCase
 */
const sinon = require('sinon');
const SimpleSearchUsecase = require('../../../src/usecases/SimpleSearchUseCase');
const ChatBotRepository = require('../../../src/data/ChatBotRepository');
const stubUtils = require('../../testData/stubUtils');

describe('SimpleSearchUseCase', () => {

  let stubRepository, stubSearch, stubLogger, stubIsInCategoryList;

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
          category: 'educ',
          description: 'oldest bank in town',
          icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/bank-icon.png',
          id: 'oldbank@botplatform.orange.fr',
          name: 'Old Bank'
        }]
    });
    stubSearch.withArgs('ban', 'fina').resolves({
      result: [
        {
          category: 'finabank',
          description: 'elue meilleure banque pour les jeunes',
          icon: 'https://upload.wikimedia.org/wikipedia/fr/0/09/Orange_Bank_2017.png',
          id: 'orangebank@botplatform.orange.fr',
          name: 'Orange Bank'
        }]
    });
    stubSearch.withArgs('educ').rejects();
    stubSearch.withArgs('toto').resolves();

    stubIsInCategoryList = sinon.stub();
    stubIsInCategoryList.withArgs('tit').rejects();
    stubIsInCategoryList.withArgs('toto').resolves(false);
    stubIsInCategoryList.withArgs('fina').resolves(true);

    stubRepository = sinon.createStubInstance(ChatBotRepository, {
      search: stubSearch,
      isCategoryInList: stubIsInCategoryList,
    });

    stubLogger = stubUtils.createStubLogger();
  });

  /*************************************************************************/

  context('when query is successful', () => {

    it('emits Success with array of chatbot when global search succeeded', (done) => {
      const searchChatbots = new SimpleSearchUsecase(stubRepository, stubLogger);

      searchChatbots.on(searchChatbots.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      searchChatbots.on(searchChatbots.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
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
              category: 'educ',
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

    it('emits Success with array of chatbot when search on category succeeded', (done) => {
      const searchChatbots = new SimpleSearchUsecase(stubRepository, stubLogger);

      searchChatbots.on(searchChatbots.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      searchChatbots.on(searchChatbots.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
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
            }]
        });
        done();
      });

      searchChatbots.execute('ban', 'fina');
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
      getChatbotCategory.on(getChatbotCategory.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
      });

      getChatbotCategory.execute();
    });

    it('emits NOT_FOUND when category not found', (done) => {
      const getChatbotCategory = new SimpleSearchUsecase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });
      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      getChatbotCategory.on(getChatbotCategory.events.NOT_FOUND, () => {
        done();
      });

      getChatbotCategory.execute('ban', 'toto');
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
      getChatbotCategory.on(getChatbotCategory.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
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
