/**
 * Unit tests for apiRouter
 */
const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const ApiRouter = require('../../../../src/infrastructure/routes/ApiRouter');
const GetRootCategoriesUseCase = require('../../../../src/usecases/GetRootCategoriesUseCase');
const ChatBotRepository = require('../../../../src/interface/ChatBotRepository');


describe('GET /getDefaultCategories', function () {

  context('when query is successful', () => {
    it('respond with json with categories', function (done) {
      //Init
      const stubChatBotRepository = sinon.createStubInstance(ChatBotRepository, {
        getRootCategories: sinon.stub().resolves([
          {
            id: 'educ',
            name: 'Education'
          }
        ]),
      });
      const getRootCategoriesUseCaseImpl = new GetRootCategoriesUseCase(stubChatBotRepository);
      const useCaseContainer = {};
      useCaseContainer.getRootCategoriesUsecase = getRootCategoriesUseCaseImpl;


      const apiRouter = new ApiRouter(useCaseContainer, {}, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/getDefaultCategories')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          response.body.should.eql([
            {
              id: 'educ',
              name: 'Education'
            }
          ]);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  context('when query is unsuccessful', () => {
    it('respond with error when error occurs', function (done) {
      //Init
      const stubChatBotRepository = sinon.createStubInstance(ChatBotRepository, {
        getRootCategories: sinon.stub().rejects(),
      });
      const getRootCategoriesUseCaseImpl = new GetRootCategoriesUseCase(stubChatBotRepository);
      const useCaseContainer = {};
      useCaseContainer.getRootCategoriesUsecase = getRootCategoriesUseCaseImpl;


      const apiRouter = new ApiRouter(useCaseContainer, {}, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/getDefaultCategories')
        .expect(400, done);
    });


    it('respond with error when usecase not added to container', function (done) {
      //Init
      const useCaseContainer = {};

      const apiRouter = new ApiRouter(useCaseContainer, {}, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/getDefaultCategories')
        .expect(400, done);
    });

    it('respond with error when no container', function (done) {
      //Init
      const apiRouter = new ApiRouter(undefined, {}, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/getDefaultCategories')
        .expect(400, done);
    });
  });
});

describe('GET /listCategory', function () {

  context('when query is successful', () => {

  });

  context('when query is unsuccessful', () => {


    it('respond with error when parameter not set', function (done) {
      //Init
      const useCaseContainer = {};
      useCaseContainer.getRootCategoriesUsecase = {};


      const apiRouter = new ApiRouter(useCaseContainer, {}, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/listCategory')
        .expect(400, done);
    });

    it('respond with error when usecase not added to container', function (done) {
      //Init
      const useCaseContainer = {};

      const apiRouter = new ApiRouter(useCaseContainer, {}, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/listCategory')
        .expect(400, done);
    });

    it('respond with error when no container', function (done) {
      //Init
      const apiRouter = new ApiRouter(undefined, {}, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/listCategory')
        .expect(400, done);
    });
  });
});
