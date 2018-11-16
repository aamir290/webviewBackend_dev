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

      categories.result.length.should.be.equal(2);
      categories.should.eql({
        result: [
          {
            id: 'educ',
            name: 'Education',
            icon: '<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m9.55077179 12.9155034-5.73943662-2.5187793v3.0798122c0 .2652582.15258216.5046948.38732395.6032864l5.3028169 2.3333333c.30985915.1314554.65492958.1314554.96478878 0l4.8920187-2.0798122c.2957747-.1244131.4906104-.42723.4906104-.7652582v-3.0774648l-5.4342723 2.4248826c-.2769953.1173709-.5868545.1173709-.86384981 0zm10.21596241-5.5046948-9.42723-4.33568075c-.2276995-.09859155-.48356809-.10093897-.71361504-.00234742l-9.42723004 4.29577465c-.2629108.11267606-.26525822.50469484-.00469484.62206573l9.44366197 4.34272299c.22065728.0985916.46713615.0985916.68779345.0023474l7.5868544-3.45774645v3.56338025c-.1784037.0610329-.298122.1760564-.298122.3075118v2.8380281h.0023474c.0164319.185446.2723005.3333334.584507.3333334.314554 0 .5680752-.1478874.5845071-.3333334h.0023474v-2.8403755c0-.1220658-.1032864-.2276996-.258216-.2910799v-3.85915489l1.2370892-.56338028c.2629108-.11737089.2629108-.50938967 0-.62206573z"/></svg>',
            subCategories: undefined
          },
          {
            id: 'fina',
            name: 'Finance',
            icon: '<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m10.6103286 12.9812207h1.173709c.3239436 0 .5868544-.2629108.5868544-.5868545s-.2629108-.5868545-.5868544-.5868545h-1.173709c-.3239436 0-.5868544.2629108-.5868544.5868545s.2629108.5868545.5868544.5868545zm-4.69483564-8.80281694h9.66666664l-1.5610328-3.47417841c-.2652583-.59154929-.9600939-.85446009-1.5516432-.58920188l-11.76995308 5.29342723c-.5915493.26525822-.8544601.9600939-.58920188 1.5516432l3.36619718 7.4882629c.18075118.4037559.56338028.6549296.97652582.6877934-.18779342-.2793427-.29812206-.6173709-.29812206-.9812206v-8.21596246c0-.97183099.78873239-1.76056338 1.76056338-1.76056338zm1.76056338 8.80281694h1.17370892c.32394366 0 .58685446-.2629108.58685446-.5868545s-.2629108-.5868545-.58685446-.5868545h-1.17370892c-.32394366 0-.58685446.2629108-.58685446.5868545s.2629108.5868545.58685446.5868545zm11.15023476-8.21596248h-12.91079814c-.64788733 0-1.17370892.52582159-1.17370892 1.17370892v8.21596246c0 .6478873.52582159 1.1737089 1.17370892 1.1737089h12.91079814c.6478873 0 1.1737089-.5258216 1.1737089-1.1737089v-8.21596246c0-.64788733-.5258216-1.17370892-1.1737089-1.17370892zm0 8.80281688c0 .3239437-.2629108.5868545-.5868545.5868545h-11.73708918c-.32394366 0-.58685446-.2629108-.58685446-.5868545v-4.1079812h12.91079814zm0-5.86854458h-12.91079814v-1.17370892c0-.32394367.2629108-.58685446.58685446-.58685446h11.73708918c.3239437 0 .5868545.26291079.5868545.58685446zm-5.2816902 5.28169018h1.173709c.3239436 0 .5868544-.2629108.5868544-.5868545s-.2629108-.5868545-.5868544-.5868545h-1.173709c-.3239436 0-.5868544.2629108-.5868544.5868545s.2629108.5868545.5868544.5868545z" transform="translate(0 2)"/></svg>',
            subCategories: undefined
          }
        ]
      }, 'Array categories should be the same');
    });

    it('return empty array if path is incorrect', async () => {

      const localSource = new LocalSource('titi', stubLogger);
      const categories = await localSource.getRootCategories();

      categories.result.length.should.be.equal(0);
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
