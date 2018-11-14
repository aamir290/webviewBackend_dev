/**
 * Unit tests for LocalSource
 */
const sinon = require('sinon');
const LocalSource = require('../../../../src/infrastructure/sources/LocalSource');
const testDataPath = './test/unit/testData';

describe('LocalSource', () => {

  let stubLogger;

  before(() => {
    stubLogger = {};
    stubLogger.error = sinon.stub();
  });

  context('when getting default categories', () => {
    it('return default categories array', async () => {
      const localSource = new LocalSource(testDataPath);
      const categories = await localSource.getRootCategories();

      categories.length.should.be.equal(2);
      categories.should.eql([
        {
          id: 'educ',
          name: 'Education',
          subCategories: undefined
        },
        {
          id: 'fina',
          name: 'Finance',
          subCategories: undefined
        }
      ], 'Array categories should be the same');
    });

    it('return empty array if path is incorrect', async () => {

      const localSource = new LocalSource('titi', stubLogger);
      const categories = await localSource.getRootCategories();

      categories.length.should.be.equal(0);
      stubLogger.error.should.have.been.calledTwice;
    });
  });

  context('when testing category in category list', () => {

    it('return true if category exists', async () => {
      const localSource = new LocalSource(testDataPath, stubLogger);
      const isInCategoryList = await localSource.isCategoryInList('fina');

      isInCategoryList.should.be.equal(true);
    });

    it('return true if sub category exists', async () => {
      const localSource = new LocalSource(testDataPath, stubLogger);
      const isInCategoryList = await localSource.isCategoryInList('finabank');

      isInCategoryList.should.be.equal(true);
    });

    it('return false if category does not exist', async () => {
      const localSource = new LocalSource(testDataPath, stubLogger);
      const isInCategoryList = await localSource.isCategoryInList('toto');

      isInCategoryList.should.be.equal(false);
    });

    it('return false if sub category does not exist', async () => {
      const localSource = new LocalSource(testDataPath, stubLogger);
      const isInCategoryList = await localSource.isCategoryInList('finatoto');

      isInCategoryList.should.be.equal(false);
    });

    it('return false if parameter not set', async () => {
      const localSource = new LocalSource(testDataPath, stubLogger);

      (() => {
        localSource.isCategoryInList();
      }).should.throw('Missing parameter');
    });
  });

  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
