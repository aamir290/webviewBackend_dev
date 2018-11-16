/**
 * Unit tests for GetRootCategoriesUseCase
 */
const sinon = require('sinon');
const GetRootCategoriesUseCase = require('../../../src/usecases/GetRootCategoriesUseCase');
const ChatBotRepository = require('../../../src/interface/ChatBotRepository');

describe('GetRootCategoriesUseCase', () => {

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
        getRootCategories: stubGetAllCategories
      });

      const getRootCategories = new GetRootCategoriesUseCase(stubRepository);

      getRootCategories.on(getRootCategories.events.SUCCESS, (categories) => {
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
      getRootCategories.on(getRootCategories.events.ERROR, () => {
        done('fail');
      });

      getRootCategories.execute();
    });

    it('emits ERROR when result is undefined', (done) => {
      const stubGetAllCategories = sinon.stub().resolves(undefined);
      const stubRepository = sinon.createStubInstance(ChatBotRepository, {
        getRootCategories: stubGetAllCategories
      });

      const getRootCategories = new GetRootCategoriesUseCase(stubRepository);

      getRootCategories.on(getRootCategories.events.SUCCESS, () => {
        done('fail');
      });
      getRootCategories.on(getRootCategories.events.ERROR, () => {
        stubGetAllCategories.should.have.been.calledOnce;
        done();
      });

      getRootCategories.execute();
    });
  });

  context('when query is unsuccessful', () => {
    it('emits ERROR', (done) => {
      const stubGetAllCategories = sinon.stub().rejects();
      const stubRepository = sinon.createStubInstance(ChatBotRepository, {
        getRootCategories: stubGetAllCategories
      });

      const getRootCategories = new GetRootCategoriesUseCase(stubRepository);

      getRootCategories.on(getRootCategories.events.ERROR, () => {
        stubGetAllCategories.should.have.been.calledOnce;
        done();
      });
      getRootCategories.on(getRootCategories.events.SUCCESS, () => {
        done('fail');
      });

      getRootCategories.execute();
    });
  });


  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
