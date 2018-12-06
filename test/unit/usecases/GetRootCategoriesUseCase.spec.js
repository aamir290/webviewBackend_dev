/**
 * Unit tests for getCategoriesUseCase
 */
const sinon = require('sinon');
const getCategoriesUseCase = require('../../../src/usecases/GetCategoriesUseCase');
const ChatBotRepository = require('../../../src/data/ChatBotRepository');

describe('getCategoriesUseCase', () => {

  context('when query is successful', () => {
    it('emits SUCCESS with a category array result', (done) => {
      const stubGetAllCategories = sinon.stub().resolves({
        result: [
          {
            id: 'educ',
            name: 'Education'
          }
        ]
      });
      const stubRepository = sinon.createStubInstance(ChatBotRepository, {
        getCategories: stubGetAllCategories
      });

      const getCategories = new getCategoriesUseCase(stubRepository);

      getCategories.on(getCategories.events.SUCCESS, (categories) => {
        stubGetAllCategories.should.have.been.calledOnce;
        categories.should.eql({
          result: [
            {
              id: 'educ',
              name: 'Education'
            }
          ]
        }, 'Array categories should be the same');
        done();
      });
      getCategories.on(getCategories.events.ERROR, () => {
        done('fail');
      });

      getCategories.execute();
    });

    it('emits ERROR when result is undefined', (done) => {
      const stubGetAllCategories = sinon.stub().resolves(undefined);
      const stubRepository = sinon.createStubInstance(ChatBotRepository, {
        getCategories: stubGetAllCategories
      });

      const getCategories = new getCategoriesUseCase(stubRepository);

      getCategories.on(getCategories.events.SUCCESS, () => {
        done('fail');
      });
      getCategories.on(getCategories.events.ERROR, () => {
        stubGetAllCategories.should.have.been.calledOnce;
        done();
      });

      getCategories.execute();
    });
  });

  context('when query is unsuccessful', () => {
    it('emits ERROR', (done) => {
      const stubGetAllCategories = sinon.stub().rejects();
      const stubRepository = sinon.createStubInstance(ChatBotRepository, {
        getCategories: stubGetAllCategories
      });

      const getCategories = new getCategoriesUseCase(stubRepository);

      getCategories.on(getCategories.events.ERROR, () => {
        stubGetAllCategories.should.have.been.calledOnce;
        done();
      });
      getCategories.on(getCategories.events.SUCCESS, () => {
        done('fail');
      });

      getCategories.execute();
    });
  });


  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
