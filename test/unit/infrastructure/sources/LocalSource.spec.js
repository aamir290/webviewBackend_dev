/**
 * Unit tests for LocalSource
 */
const LocalSource = require('../../../../src/infrastructure/sources/LocalSource');

describe('LocalSource', () => {

  context('when getting default categories', () => {
    it('return default categories array', async () => {
      const localSource = new LocalSource();
      const categories = await localSource.getAllCategories();

      categories.should.eql([], 'Array categories should be the same');
    });
  });
});
