/**
 * Unit tests for GetRootCategoriesUseCase
 */
const sinon = require('sinon');
const GetChatbotInCategoryUseCase = require('../../../src/usecases/GetChatbotInCategoryUseCase');
const ChatBotRepository = require('../../../src/interface/ChatBotRepository');

describe('GetChatbotInCategoryUseCase', () => {

  context('when query is unsuccessful', () => {
    it('emits PARAMETER_ERROR when categoryid is undefined', (done) => {
      // const stubGetAllCategories = sinon.stub().rejects();
      // const stubRepository = sinon.createStubInstance(ChatBotRepository, {
      //   getRootCategories: stubGetAllCategories
      // });

      const getChatbotCategory = new GetChatbotInCategoryUseCase();

      getChatbotCategory.on(getChatbotCategory.events.PARAMETER_ERROR, (errorMessage) => {
        errorMessage.should.eql('Incorrect category id parameter');
        done();
      });
      getChatbotCategory.on(getChatbotCategory.events.SUCCESS, () => {
        done('fail');
      });
      getChatbotCategory.on(getChatbotCategory.events.NOT_FOUND, () => {
        done('fail');
      });
      getChatbotCategory.on(getChatbotCategory.events.ERROR, () => {
        done('fail');
      });

      getChatbotCategory.execute();
    });
  });


  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
