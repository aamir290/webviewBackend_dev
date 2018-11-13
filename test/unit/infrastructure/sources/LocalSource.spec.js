/**
 * Unit tests for LocalSource
 */
const LocalSource = require('../../../../src/infrastructure/sources/LocalSource');
const testDataPath = './test/unit/testData';

describe('LocalSource', () => {

  context('when getting default categories', () => {
    it('return default categories array', async () => {
      const localSource = new LocalSource(testDataPath);
      const categories = await localSource.getRootCategories();

      categories.length.should.be.equal(2);
      categories.should.eql([
        {
          id: 'educ',
          name: 'Education'
        },
        {
          id: 'fina',
          name: 'Finance'
        }
      ], 'Array categories should be the same');
    });
  });
});
