/**
 * Unit tests for LocalSource
 */
const LocalSource = require('../../../../src/infrastructure/sources/LocalSource');

describe('LocalSource', () => {

  context('when getting default categories', () => {
    it('return default categories array', async () => {
      const localSource = new LocalSource();
      const categories = await localSource.getRootCategories();

      categories.length.should.be.equal(10);
      categories.should.eql([
        {
          id: 'educ',
          name: 'Education'
        },
        {
          id: 'fina',
          name: 'Finance'
        },
        {
          id: 'food',
          name: 'Food & Drink'
        },
        {
          id: 'game',
          name: 'Games'
        },
        {
          id: 'heal',
          name: 'Health & Fitness'
        },
        {
          id: 'life',
          name: 'Lifestyle'
        },
        {
          id: 'news',
          name: 'News & Media'
        },
        {
          id: 'ente',
          name: 'Entertainment'
        },
        {
          id: 'shop',
          name: 'Shopping'
        },
        {
          id: 'trav',
          name: 'Travel'
        }
      ], 'Array categories should be the same');
    });
  });
});
