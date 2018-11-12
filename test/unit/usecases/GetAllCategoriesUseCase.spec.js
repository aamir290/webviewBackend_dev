/**
 * Unit tests for GetAllCategoriesUseCase
 */
const { expect } = require('chai');
const GetAllCategoriesUseCase = require('../../../src/usecases/GetAllCategoriesUseCase');

describe('GetAllCategoriesUseCase', () => {

  context('when query is successful', () => {
    it('emits SUCCESS', (done)=>{
      const getAllCategories = new GetAllCategoriesUseCase();

      getAllCategories.on(getAllCategories.events.SUCCESS, () => {
        done();
      });

      getAllCategories.execute();
    });
  });
});
