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
          name: 'Education',
          idParent : undefined
        },
        {
          id: 'fina',
          name: 'Finance',
          idParent : undefined
        },
        {
          id: 'food',
          name: 'Food & Drink',
          idParent : undefined
        },
        {
          id: 'game',
          name: 'Games',
          idParent : undefined
        },
        {
          id: 'heal',
          name: 'Health & Fitness',
          idParent : undefined
        },
        {
          id: 'life',
          name: 'Lifestyle',
          idParent : undefined
        },
        {
          id: 'news',
          name: 'News & Media',
          idParent : undefined
        },
        {
          id: 'ente',
          name: 'Entertainment',
          idParent : undefined
        },
        {
          id: 'shop',
          name: 'Shopping',
          idParent : undefined
        },
        {
          id: 'trav',
          name: 'Travel',
          idParent : undefined
        }
      ], 'Array categories should be the same');
    });
  });
});
