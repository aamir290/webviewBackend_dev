/**
 * Unit tests for chatBotReoository
 */
const sinon = require('sinon');
const ChatBotRepository = require('../../../src/interface/ChatBotRepository');
const LocalSource = require('../../../src/infrastructure/sources/LocalSource');

describe('ChatBotRepository', () => {

  context('when getting default categories', () => {
    it('return empty array when local sources has no data', () => {
      const stubGetAllCategoriesLocalSource = sinon.stub().resolves([]);
      const stubLocalSource = sinon.createStubInstance(LocalSource, {
        getAllCategories: stubGetAllCategoriesLocalSource
      });

      const chatBotRepository = new ChatBotRepository(stubLocalSource);
      const categories = chatBotRepository.getAllCategories();

      stubGetAllCategoriesLocalSource.should.have.been.calledOnce;
      categories.should.eql([], 'Array categories should be the same');

    });
  });

  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
