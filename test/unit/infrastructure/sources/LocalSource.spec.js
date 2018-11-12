/**
 * Unit tests for LocalSource
 */
const LocalSource = require('../../../../src/infrastructure/sources/LocalSource');

describe('LocalSource', () => {

  context('when getting default categories', () => {
    it('return default categories array', async () => {
      const localSource = new LocalSource();
      const categories = await localSource.getAllCategories();

      categories.length.should.be.equal(10);
      categories.should.eql([
        {
          id: 'educ',
          name: 'Education'
        },
        {
          id: 'educ',
          name: 'Finance'
        },
        {
          id: 'educ',
          name: 'Food & Drink'
        },
        {
          id: 'educ',
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
