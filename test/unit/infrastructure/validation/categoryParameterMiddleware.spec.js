/**
 * Unit tests for Server
 */

const sinon = require('sinon');
const categoryParameterMiddleware = require('../../../../src/infrastructure/validation/categoryParameterMiddleware');

describe('categoryParameterMiddleware', () => {

  let stubRequest, stubResponse, stubNext;

  before(() => {
    stubRequest = {};
    stubRequest.params = {};

    stubResponse = {};
    stubResponse.status = sinon.stub();
    stubResponse.status.returns(stubResponse);
    stubResponse.end = sinon.stub();

    stubNext = sinon.stub();
  });

  context('when testing correct category id', () => {
    it('call next with category with 4 chars',  () => {
      stubRequest.params.categoryId = 'fina';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });

    it('call next with category with 8 chars',  () => {
      stubRequest.params.categoryId = 'finabank';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
    });
  });

  context('when testing incorrect category id', () => {
    it('return 400 BAD Request with category < 4 chars',  () => {
      stubRequest.params.categoryId = 'fin';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(400);
      stubResponse.end.should.have.been.calledOnce;
    });

    it('return 400 BAD Request with category > 8 chars',  () => {
      stubRequest.params.categoryId = 'finabanke';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(400);
      stubResponse.end.should.have.been.calledOnce;
    });

    it('return 400 BAD Request with category with num',  () => {
      stubRequest.params.categoryId = 'fina12z';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledWith(400);
      stubResponse.end.should.have.been.called;
    });

    it('return 400 BAD Request with category incorrect char',  () => {
      stubRequest.params.categoryId = 'finre<e';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledWith(400);
      stubResponse.end.should.have.been.called;
    });

    it('return 400 BAD Request with no parameter',  () => {
      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledWith(400);
      stubResponse.end.should.have.been.called;
    });
  });

  afterEach(()=>{
    sinon.resetHistory();
  });

});
