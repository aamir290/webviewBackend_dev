/**
 * Unit tests for chatBotReoository
 */
const sinon = require('sinon');
const ChatBotRepository = require('../../../src/interface/ChatBotRepository');
const LocalSource = require('../../../src/infrastructure/sources/LocalSource');
const DistantSource = require('../../../src/infrastructure/sources/DistantSource');

describe('ChatBotRepository', () => {

  /***********************************************************************************************************/

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
      await chatBotRepository.getRootCategories().should.be.rejected;
    });
  });

  /***********************************************************************************************************/

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

    it('throw error when problem with local source', async () => {
      const chatBotRepository = new ChatBotRepository();

      await chatBotRepository.isCategoryInList().should.be.rejected;
    });

    afterEach(() => {
      // Reset count
      sinon.resetHistory();
    });

    after(() => {
      //restore all previous stubed method
      sinon.restore();
    });
  });

  /***********************************************************************************************************/

  context('when getting listcategory', () => {

    let stubDistantSource;
    let stubListCategory;

    before(() => {
      stubListCategory = sinon.stub();
      stubListCategory.withArgs('titi').resolves({
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
          }]});
      stubListCategory.withArgs('toto').resolves({
        result: []
      });
      stubListCategory.withArgs('tutu').rejects();
      stubListCategory.rejects('Missing parameter');

      stubDistantSource = sinon.createStubInstance(DistantSource, {
        listCategory: stubListCategory
      });
    });

    it('return array of chatbot when distant source return array', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource);
      const isInList = await chatBotRepository.getListCategory('titi');

      stubListCategory.should.have.been.calledOnce;
      isInList.should.eql({
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
          }]});

    });

    it('return empty array of chatbot when distant source return empty array', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource);
      const isInList = await chatBotRepository.getListCategory('toto');

      stubListCategory.should.have.been.calledOnce;
      isInList.should.eql({
        result: []
      });
    });

    it('throw error when no distant source', async () => {
      const chatBotRepository = new ChatBotRepository();

      await chatBotRepository.getListCategory().should.be.rejected;
    });

    it('throw error when no parameter', async () => {
      const chatBotRepository = new ChatBotRepository(stubDistantSource);

      await chatBotRepository.getListCategory().should.be.rejected;
    });

    it('throw error when problem with distant source', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource);
      await chatBotRepository.getListCategory('tutu').should.be.rejected;
    });

    afterEach(() => {
      // Reset count
      sinon.resetHistory();
    });

  });

  /***********************************************************************************************************/

  context('when getting category name', () => {

    let stubLocalSource;
    let stubGetCategoryName;

    before(() => {
      stubGetCategoryName = sinon.stub();
      stubGetCategoryName.withArgs('titi').returns('titiName');
      stubGetCategoryName.withArgs('tutu').rejects('Category not found');
      stubGetCategoryName.rejects('Missing parameter');

      stubLocalSource = sinon.createStubInstance(LocalSource, {
        getCategoryName: stubGetCategoryName
      });
    });

    it('return correct category name', async () => {
      const chatBotRepository = new ChatBotRepository(stubLocalSource);
      const isInList = await chatBotRepository.getCategoryName('titi');

      stubGetCategoryName.should.have.been.calledOnce;
      isInList.should.eql('titiName');

    });

    it('throw error when category not found', async () => {
      const chatBotRepository = new ChatBotRepository(stubLocalSource);
      await chatBotRepository.getCategoryName('tutu').should.be.rejected;
    });

    it('throw error when no distant source', async () => {
      const chatBotRepository = new ChatBotRepository();

      await chatBotRepository.getCategoryName().should.be.rejected;
    });

    it('throw error when no parameter', async () => {
      const chatBotRepository = new ChatBotRepository(stubLocalSource);

      await chatBotRepository.getCategoryName().should.be.rejected;
    });

    afterEach(() => {
      // Reset count
      sinon.resetHistory();
    });

  });
});
