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
      const chatBotRepository = new ChatBotRepository();
      const categories = await chatBotRepository.getRootCategories();

      expect(categories).to.eql(undefined);
    });
  });

  context('when testing category in list', () => {

    let stubLocalSource;
    let stubIsCategoryInListLocalSource;

    before(() => {
      stubIsCategoryInListLocalSource = sinon.stub();
      stubIsCategoryInListLocalSource.withArgs('titi').resolves(true);
      stubIsCategoryInListLocalSource.withArgs('toto').resolves(false);
      stubIsCategoryInListLocalSource.rejects('Missing parameter');

      stubLocalSource = sinon.createStubInstance(LocalSource, {
        isCategoryInList: stubIsCategoryInListLocalSource
      });
    });

    it('return true when localsource return true', async () => {
      const chatBotRepository = new ChatBotRepository(stubLocalSource);
      const isInList = await chatBotRepository.isCategoryInList('titi');

      stubIsCategoryInListLocalSource.should.have.been.calledOnce;
      isInList.should.eql(true);

    });

    it('return true when localsource return false', async () => {
      const chatBotRepository = new ChatBotRepository(stubLocalSource);
      const isInList = await chatBotRepository.isCategoryInList('toto');

      stubIsCategoryInListLocalSource.should.have.been.calledOnce;
      isInList.should.eql(false);

    });

    it('reject when localsource throw error', async () => {
      const chatBotRepository = new ChatBotRepository(stubLocalSource);

      chatBotRepository.isCategoryInList().should.be.rejected;
    });

    afterEach(() => {
      // Reset count
      sinon.resetHistory();
    });

    after(()=>{
      //restore all previous stubed method
      sinon.restore();
    });
  });
});
