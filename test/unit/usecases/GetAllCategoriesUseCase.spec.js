/**
 * Unit tests for GetAllCategoriesUseCase
 */
const { expect } = require('chai');
const sinon = require('sinon');
const GetAllCategoriesUseCase = require('../../../src/usecases/GetAllCategoriesUseCase');
const ChatBotRepository = require('../../../src/infrastructure/repository/ChatBotRepository');

describe('GetAllCategoriesUseCase', () => {

  context('when query is successful', () => {
    it('emits SUCCESS', (done)=>{
      const stubGetAllCategories = sinon.stub().resolves();
      const stubRepository = sinon.createStubInstance(ChatBotRepository, {
        getAllCategories : stubGetAllCategories
      });

      const getAllCategories = new GetAllCategoriesUseCase(stubRepository);

      getAllCategories.on(getAllCategories.events.SUCCESS, () => {

        expect(stubGetAllCategories).to.have.been.calledOnce;
        done();
      });

      getAllCategories.execute();


    });
  });
});
