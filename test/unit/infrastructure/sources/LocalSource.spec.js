/**
 * Unit tests for LocalSource
 */
const sinon = require('sinon');
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

    it('return empty array if path is incorrect', async () => {
      const stubLogger = {};
      stubLogger.error = sinon.stub();

      const localSource = new LocalSource('titi', stubLogger);
      const categories = await localSource.getRootCategories();

      categories.length.should.be.equal(0);
      stubLogger.error.should.have.been.calledTwice;
    });
  });
});
