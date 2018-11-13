/**
 * Unit tests for chatBotReoository
 */
const {expect} = require('chai');
const sinon = require('sinon');
const ChatBotRepository = require('../../../src/interface/ChatBotRepository');
const LocalSource = require('../../../src/infrastructure/sources/LocalSource');

describe('ChatBotRepository', () => {

  context('when getting default categories', () => {
    it('return empty array when local sources has no data', async () => {
      const stubGetAllCategoriesLocalSource = sinon.stub().resolves([]);
      const stubLocalSource = sinon.createStubInstance(LocalSource, {
        getRootCategories: stubGetAllCategoriesLocalSource
      });

      const chatBotRepository = new ChatBotRepository(stubLocalSource);
      const categories = await chatBotRepository.getRootCategories();

      stubGetAllCategoriesLocalSource.should.have.been.calledOnce;
      categories.should.eql([], 'Array categories should be the same');

    });

    it('return array when local sources has  data', async () => {
      const stubGetAllCategoriesLocalSource = sinon.stub().resolves([{
        id: 'educ',
        name: 'Education'
      }]);
      const stubLocalSource = sinon.createStubInstance(LocalSource, {
        getRootCategories: stubGetAllCategoriesLocalSource
      });

      const chatBotRepository = new ChatBotRepository(stubLocalSource);
      const categories = await chatBotRepository.getRootCategories();

      stubGetAllCategoriesLocalSource.should.have.been.calledOnce;
      categories.should.eql([{
        id: 'educ',
        name: 'Education'
      }], 'Array categories should be the same');

    });

    it('return undefined when local source has a problem', async () => {
      const stubLocalSource = sinon.createStubInstance(LocalSource);

      const chatBotRepository = new ChatBotRepository(stubLocalSource);
      const categories = await chatBotRepository.getRootCategories();

      expect(categories).to.eql(undefined);
    });
  });

  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
