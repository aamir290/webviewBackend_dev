/**
 * Unit tests for GetRootCategoriesUseCase
 */
const sinon = require('sinon');
const GetChatbotInCategoryUseCase = require('../../../src/usecases/GetChatbotInCategoryUseCase');
const ChatBotRepository = require('../../../src/data/ChatBotRepository');
const stubUtils = require('../../testData/stubUtils');

describe('GetChatbotInCategoryUseCase', () => {

  let stubRepository, stubIsInCategoryList, stubGetListCategory, stubLogger;

  before(() => {
    stubIsInCategoryList = sinon.stub();
    stubIsInCategoryList.withArgs('tit').rejects();
    stubIsInCategoryList.withArgs('toto').resolves(false);
    stubIsInCategoryList.withArgs('finabank').resolves(true);
    stubIsInCategoryList.withArgs('educ').resolves(true);

    stubGetListCategory = sinon.stub();
    stubGetListCategory.withArgs('finabank').resolves({
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
    stubGetListCategory.withArgs('educ').rejects();
    stubGetListCategory.withArgs(undefined).resolves({
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
        },
        {
          category: 'educ',
          description: 'oldest bank in town',
          icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/bank-icon.png',
          id: 'oldbank@botplatform.orange.fr',
          name: 'Old Bank2'
        }]
    });

    stubRepository = sinon.createStubInstance(ChatBotRepository, {
      isCategoryInList: stubIsInCategoryList,
      getListCategory: stubGetListCategory,
    });

    stubLogger = stubUtils.createStubLogger();
  });

  /*************************************************************************/

  context('when query is successful', () => {

    it('emits Success with array of chatbot when category exists and chatbots exists', (done) => {
      const getChatbotCategory = new GetChatbotInCategoryUseCase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, (chatbotResult) => {
        stubIsInCategoryList.should.have.been.calledOnce;
        stubGetListCategory.should.have.been.calledOnce;

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
      getChatbotCategory.on(getChatbotCategory.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
      });

      getChatbotCategory.execute('finabank');
    });

    it('emits SUCCESS with array of chatbot when no category', (done) => {
      const getChatbotCategory = new GetChatbotInCategoryUseCase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, (chatbotResult) => {
        stubIsInCategoryList.should.not.have.been.calledOnce;
        stubGetListCategory.should.have.been.calledOnce;

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
            },
            {
              category: 'educ',
              description: 'oldest bank in town',
              icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/bank-icon.png',
              id: 'oldbank@botplatform.orange.fr',
              name: 'Old Bank2'
            }]
        });
        done();
      });
      getChatbotCategory.on(getChatbotCategory.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
      });

      getChatbotCategory.execute();
    });

  });

  /*************************************************************************/

  context('when query is unsuccessful', () => {


    it('emits PARAMETER_ERROR when categoryid is incorrect format', (done) => {
      const getChatbotCategory = new GetChatbotInCategoryUseCase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, (errorMessage) => {
        errorMessage.should.eql('Incorrect category id parameter');
        done();
      });
      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });
      getChatbotCategory.on(getChatbotCategory.events.NOT_FOUND, () => {
        done('fail - NOT_FOUND');
      });

      getChatbotCategory.execute('tit');
    });

    it('emits NOT_FOUND when categoryid does not exists', (done) => {
      const getChatbotCategory = new GetChatbotInCategoryUseCase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, () => {
        done('fail - PARAMETER_ERROR');
      });
      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, () => {
        done('fail - SUCCESS');
      });
      getChatbotCategory.on(getChatbotCategory.events.NOT_FOUND, () => {
        stubIsInCategoryList.should.have.been.calledOnce;
        done();
      });

      getChatbotCategory.execute('toto');
    });

    it('emits PARAMETER_ERROR when error occurs with distant source', (done) => {
      const getChatbotCategory = new GetChatbotInCategoryUseCase(stubRepository, stubLogger);

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, () => {
        stubIsInCategoryList.should.have.been.calledOnce;
        stubGetListCategory.should.have.been.calledOnce;
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

  });

  context('when initializing', () => {
    it('throws error when no logger', (done) => {
      try {
        new GetChatbotInCategoryUseCase(stubRepository);
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
