/**
 * Unit tests for Server
 */

const sinon = require('sinon');
const categoryParameterMiddleware = require('../../../../src/infrastructure/validation/categoryParameterMiddleware');
const stubUtils = require('../../../testData/stubUtils');

describe('categoryParameterMiddleware', () => {

  let stubRequest, stubResponse, stubNext;

  beforeEach(() => {
    stubRequest = stubUtils.createStubRequest();
    stubResponse = stubUtils.createStubResponse();

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

      stubNext.should.have.been.calledOnce;  //one call for error, the other call at the end (not in real world)
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid Category Id - id length must be between 4 and 8');
    });

    it('return 400 BAD Request with category > 8 chars',  () => {
      stubRequest.params.categoryId = 'finabanke';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;  //one call for error, the other call at the end (not in real world)
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid Category Id - id length must be between 4 and 8');
    });

    it('return 400 BAD Request with category with num',  () => {
      stubRequest.params.categoryId = 'fina12z';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid Category Id - not alpha only');
    });

    it('return 400 BAD Request with category incorrect char',  () => {
      stubRequest.params.categoryId = 'finre<e';

      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid Category Id - not alpha only');
    });

    it('return 400 BAD Request with no parameter',  () => {
      categoryParameterMiddleware(stubRequest, stubResponse, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('Invalid Category Id - Missing parameter');
    });
  });

  afterEach(()=>{
    sinon.reset();
  });

});
