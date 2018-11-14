/**
 * Unit tests for GetRootCategoriesUseCase
 */
const sinon = require('sinon');
const GetChatbotInCategoryUseCase = require('../../../src/usecases/GetChatbotInCategoryUseCase');
const ChatBotRepository = require('../../../src/interface/ChatBotRepository');

describe('GetChatbotInCategoryUseCase', () => {

  let stubRepository;
  let stubIsInCategoryList;

  before(() => {
    stubIsInCategoryList= sinon.stub();
    stubIsInCategoryList.withArgs('tit').rejects();
    stubIsInCategoryList.withArgs('toto').resolves(false);

    stubRepository = sinon.createStubInstance(ChatBotRepository, {
      isCategoryInList: stubIsInCategoryList
    });
  });

  context('when query is unsuccessful', () => {

    it('emits PARAMETER_ERROR when categoryid is undefined', (done) => {
      const getChatbotCategory = new GetChatbotInCategoryUseCase(stubRepository);

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
      getChatbotCategory.on(getChatbotCategory.events.ERROR, () => {
        done('fail - ERROR');
      });

      getChatbotCategory.execute();
    });

    it('emits PARAMETER_ERROR when categoryid is incorrect format', (done) => {
      const getChatbotCategory = new GetChatbotInCategoryUseCase(stubRepository);

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
      getChatbotCategory.on(getChatbotCategory.events.ERROR, () => {
        done('fail - ERROR');
      });

      getChatbotCategory.execute('tit');
    });

    it('emits NOT_FOUND when categoryid does not exists', (done) => {
      const getChatbotCategory = new GetChatbotInCategoryUseCase(stubRepository);

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
      getChatbotCategory.on(getChatbotCategory.events.ERROR, () => {
        done('fail - ERROR');
      });

      getChatbotCategory.execute('toto');
    });
  });


  afterEach(() => {
    // Restore the default sandbox here
    sinon.resetHistory();
  });
});
