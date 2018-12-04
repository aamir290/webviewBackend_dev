/**
 * Unit tests for Server
 */

const sinon = require('sinon');
const errorHandlerMiddleware = require('../../../../src/infrastructure/error/errorHandlerMiddleware');
const stubUtils = require('../../../testData/stubUtils');

describe('errorHandlerMiddleware', () => {

  let stubRequest, stubResponse, stubNext;

  beforeEach(() => {
    stubRequest = stubUtils.createStubRequest();
    stubResponse = stubUtils.createStubResponse();

    stubNext = sinon.stub();
  });

  context('when testing http errors in prod env', () => {
    before(() => {
      process.env.NODE_ENV = 'production';
    });

    it('return 400 BAD Request when status 400',  () => {
      const err = {};
      err.status = 400;

      errorHandlerMiddleware(err, stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(400);
      stubResponse.end.should.have.been.calledOnce;
    });

    it('return 404 not found when status 404',  () => {
      const err = {};
      err.status = 404;

      errorHandlerMiddleware(err, stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(404);
      stubResponse.end.should.have.been.calledOnce;
    });

    after(() =>{
      process.env.NODE_ENV = 'test';
    });
  });

  context('when testing http errors in dev env', () => {
    before(() => {
      process.env.NODE_ENV = 'development';
    });

    it('return 400 BAD Request when status 400',  () => {
      const err = {};
      err.status = 400;
      err.message = 'This is an error';

      errorHandlerMiddleware(err, stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(400);
      stubResponse.end.should.have.been.calledOnceWith('This is an error');
    });

    it('return 404 not found when status 404',  () => {
      const err = {};
      err.status = 404;
      err.message = 'This is an error 2';

      errorHandlerMiddleware(err, stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(404);
      stubResponse.end.should.have.been.calledOnceWith('This is an error 2');
    });

    after(() =>{
      process.env.NODE_ENV = 'test';
    });
  });

  context('when testing other error', () => {
    it('return 400 BAD Request',  () => {
      const err = {};

      errorHandlerMiddleware(err, stubRequest, stubResponse, stubNext);

      stubResponse.status.should.have.been.calledOnceWith(400);
      stubResponse.end.should.have.been.calledOnce;
    });
  });

  afterEach(()=>{
    sinon.reset();
  });

});
