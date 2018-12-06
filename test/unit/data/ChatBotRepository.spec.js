/**
 * Unit tests for chatBotReoository
 */
const sinon = require('sinon');
const ChatBotRepository = require('../../../src/data/ChatBotRepository');
const LocalSource = require('../../../src/data/sources/LocalSource');
const DistantSource = require('../../../src/data/sources/DistantSource');
const stubUtils = require('../../testData/stubUtils');

describe('ChatBotRepository', () => {

  let stubLogger;

  before(() => {
    stubLogger = stubUtils.createStubLogger();
  });

  /***********************************************************************************************************/

  context('when getting default categories', () => {
    it('return empty array when local sources has no data', async () => {
      const stubGetAllCategoriesLocalSource = sinon.stub().resolves([]);
      const stubLocalSource = sinon.createStubInstance(LocalSource, {
        getCategories: stubGetAllCategoriesLocalSource
      });

      const chatBotRepository = new ChatBotRepository(stubLocalSource, {}, stubLogger);
      const categories = await chatBotRepository.getCategories();

      stubGetAllCategoriesLocalSource.should.have.been.calledOnce;
      categories.should.eql([], 'Array categories should be the same');

    });

    it('return array when local sources has  data', async () => {
      const stubGetAllCategoriesLocalSource = sinon.stub().resolves([{
        id: 'educ',
        name: 'Education'
      }]);
      const stubLocalSource = sinon.createStubInstance(LocalSource, {
        getCategories: stubGetAllCategoriesLocalSource
      });

      const chatBotRepository = new ChatBotRepository(stubLocalSource, {}, stubLogger);
      const categories = await chatBotRepository.getCategories();

      stubGetAllCategoriesLocalSource.should.have.been.calledOnce;
      categories.should.eql([{
        id: 'educ',
        name: 'Education'
      }], 'Array categories should be the same');

    });

    it('return undefined when local source has a problem', async () => {
      const chatBotRepository = new ChatBotRepository({}, {}, stubLogger);
      await chatBotRepository.getCategories().should.be.rejected;
    });
  });

  /***********************************************************************************************************/

  context('when testing category in list', () => {

    let stubLocalSource, stubIsCategoryInListLocalSource;

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
      const chatBotRepository = new ChatBotRepository(stubLocalSource, {}, stubLogger);
      const isInList = await chatBotRepository.isCategoryInList('titi');

      stubIsCategoryInListLocalSource.should.have.been.calledOnce;
      isInList.should.eql(true);

    });

    it('return true when localsource return false', async () => {
      const chatBotRepository = new ChatBotRepository(stubLocalSource, {}, stubLogger);
      const isInList = await chatBotRepository.isCategoryInList('toto');

      stubIsCategoryInListLocalSource.should.have.been.calledOnce;
      isInList.should.eql(false);

    });

    it('reject when localsource throw error', async () => {
      const chatBotRepository = new ChatBotRepository(stubLocalSource, {}, stubLogger);

      chatBotRepository.isCategoryInList().should.be.rejected;
    });

    it('throw error when problem with local source', async () => {
      const chatBotRepository = new ChatBotRepository({}, {}, stubLogger);

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

    let stubDistantSource, stubListCategory, stubList;

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
          }]
      });
      stubListCategory.withArgs('toto').resolves({
        result: []
      });
      stubListCategory.withArgs('tutu').rejects();
      stubListCategory.rejects('Missing parameter');

      stubList = sinon.stub();
      stubList.resolves({
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

      stubDistantSource = sinon.createStubInstance(DistantSource, {
        listCategory: stubListCategory,
        list: stubList,
      });
    });

    it('return array of chatbot when distant source return array', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource, stubLogger);
      const isInList = await chatBotRepository.getListCategory('titi');

      stubListCategory.should.have.been.calledOnce;
      stubList.should.not.have.been.called;
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
          }]
      });

    });

    it('return empty array of chatbot when distant source return empty array', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource, stubLogger);
      const isInList = await chatBotRepository.getListCategory('toto');

      stubListCategory.should.have.been.calledOnce;
      stubList.should.not.have.been.called;
      isInList.should.eql({
        result: []
      });
    });

    it('return array of chatbot when no parameter', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource, stubLogger);
      const isInList = await chatBotRepository.getListCategory();

      stubList.should.have.been.calledOnce;
      stubListCategory.should.not.have.been.called;
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
          },
          {
            category: 'educ',
            description: 'oldest bank in town',
            icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/bank-icon.png',
            id: 'oldbank@botplatform.orange.fr',
            name: 'Old Bank2'
          }]
      });

    });

    it('throw error when no distant source', async () => {
      const chatBotRepository = new ChatBotRepository({}, {}, stubLogger);

      await chatBotRepository.getListCategory().should.be.rejected;
    });

    it('throw error when problem with distant source', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource, stubLogger);
      await chatBotRepository.getListCategory('tutu').should.be.rejected;
    });

    afterEach(() => {
      // Reset count
      sinon.resetHistory();
    });

  });

  /***********************************************************************************************************/

  context('when perform search', () => {

    let stubDistantSource, stubSearch;

    before(() => {
      stubSearch = sinon.stub();
      stubSearch.withArgs('titi').resolves({
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
      stubSearch.withArgs('toto').resolves({
        result: []
      });
      stubSearch.withArgs('tutu').rejects();
      stubSearch.rejects('Missing parameter');

      stubDistantSource = sinon.createStubInstance(DistantSource, {
        search: stubSearch
      });
    });

    it('return array of chatbot when distant source return array', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource, stubLogger);
      const isInList = await chatBotRepository.search('titi');

      stubSearch.should.have.been.calledOnce;
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
          }]
      });

    });

    it('return empty array of chatbot when distant source return empty array', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource, stubLogger);
      const isInList = await chatBotRepository.search('toto');

      stubSearch.should.have.been.calledOnce;
      isInList.should.eql({
        result: []
      });
    });

    it('throw error when no distant source', async () => {
      const chatBotRepository = new ChatBotRepository({}, {}, stubLogger);

      await chatBotRepository.search().should.be.rejected;
    });

    it('throw error when no parameter', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource, stubLogger);

      await chatBotRepository.search().should.be.rejected;
    });

    it('throw error when problem with distant source', async () => {
      const chatBotRepository = new ChatBotRepository({}, stubDistantSource, stubLogger);
      await chatBotRepository.search('tutu').should.be.rejected;
    });

    afterEach(() => {
      // Reset count
      sinon.resetHistory();
    });

  });

  /***********************************************************************************************************/
  context('when initializing', () => {
    it('throws error when no logger', (done) => {
      try {
        new ChatBotRepository({}, {});
      } catch (e) {
        done();
        return;
      }
      done('fail - no error thrown');
    });
  });
});
