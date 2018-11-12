/**
 * Unit tests for GetAllCategoriesUseCase
 */
const sinon = require('sinon');
const GetAllCategoriesUseCase = require('../../../src/usecases/GetAllCategoriesUseCase');
const ChatBotRepository = require('../../../src/interface/ChatBotRepository');

describe('GetAllCategoriesUseCase', () => {

  context('when query is successful', () => {
    it('emits SUCCESS with a empty category array result', (done) => {
      const stubGetAllCategories = sinon.stub().resolves([]);
      const stubRepository = sinon.createStubInstance(ChatBotRepository, {
        getAllCategories: stubGetAllCategories
      });

      const getAllCategories = new GetAllCategoriesUseCase(stubRepository);

      getAllCategories.on(getAllCategories.events.SUCCESS, (categories) => {
        stubGetAllCategories.should.have.been.calledOnce;
        categories.should.eql([], 'Array categories should be the same');
        done();
      });
      getAllCategories.on(getAllCategories.events.ERROR, () => {
        done('fail');
      });

      getAllCategories.execute();
    });
  });

  context('when query is unsuccessful', () => {
    it('emits ERROR', (done) => {
      const stubGetAllCategories = sinon.stub().rejects();
      const stubRepository = sinon.createStubInstance(ChatBotRepository, {
        getAllCategories: stubGetAllCategories
      });

      const getAllCategories = new GetAllCategoriesUseCase(stubRepository);

      getAllCategories.on(getAllCategories.events.ERROR, () => {
        stubGetAllCategories.should.have.been.calledOnce;
        done();
      });
      getAllCategories.on(getAllCategories.events.SUCCESS, () => {
        done('fail');
      });

      getAllCategories.execute();
    });
  });


  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
