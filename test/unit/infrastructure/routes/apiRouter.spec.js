/**
 * Unit tests for apiRouter
 */
const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const ApiRouter = require('../../../../src/infrastructure/routes/ApiRouter');
const GetRootCategoriesUseCase = require('../../../../src/usecases/GetRootCategoriesUseCase');
const GetChatBotInCategoryUseCase = require('../../../../src/usecases/GetChatbotInCategoryUseCase');
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
      const useCaseContainer = {};
      useCaseContainer.getRootCategoriesUsecase = GetRootCategoriesUseCase;


      const apiRouter = new ApiRouter(useCaseContainer, stubChatBotRepository, {});
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
      const useCaseContainer = {};
      useCaseContainer.getRootCategoriesUsecase = GetRootCategoriesUseCase;


      const apiRouter = new ApiRouter(useCaseContainer, stubChatBotRepository, {});
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

  let stubRepository, useCaseContainer;

  before(() => {
    const stubIsInCategoryList= sinon.stub();
    stubIsInCategoryList.withArgs('tit').rejects();
    stubIsInCategoryList.withArgs('toto').resolves(false);
    stubIsInCategoryList.withArgs('fina').resolves(true);
    stubIsInCategoryList.withArgs('finabank').resolves(true);

    const stubGetListCategory= sinon.stub();
    stubGetListCategory.withArgs('fina').resolves({
      result: [
        {
          category: 'finabank',
          description: 'elue meilleure banque pour les jeunes',
          icon: 'https://upload.wikimedia.org/wikipedia/fr/0/09/Orange_Bank_2017.png',
          id: 'orangebank@botplatform.orange.fr',
          name: 'Orange Bank'
        },
        {
          category: 'finabank',
          description: 'oldest bank in town',
          icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/bank-icon.png',
          id: 'oldbank@botplatform.orange.fr',
          name: 'Old Bank'
        }]});
    stubGetListCategory.withArgs('finabank').rejects();

    stubRepository = sinon.createStubInstance(ChatBotRepository, {
      isCategoryInList: stubIsInCategoryList,
      getListCategory: stubGetListCategory
    });


    useCaseContainer = {};
    useCaseContainer.getChatbotInCategoryUseCase = GetChatBotInCategoryUseCase;
  });

  context('when query is successful', () => {

    it('respond with 404 when category not found', function (done) {
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/listCategory/toto')
        .expect(404, done);
    });

    it('respond with array of chatbots when category found', function (done) {
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/listCategory/fina')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          response.body.should.eql({
            result: [
              {
                category: 'finabank',
                description: 'elue meilleure banque pour les jeunes',
                icon: 'https://upload.wikimedia.org/wikipedia/fr/0/09/Orange_Bank_2017.png',
                id: 'orangebank@botplatform.orange.fr',
                name: 'Orange Bank'
              },
              {
                category: 'finabank',
                description: 'oldest bank in town',
                icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/bank-icon.png',
                id: 'oldbank@botplatform.orange.fr',
                name: 'Old Bank'
              }]});
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  context('when query is unsuccessful', () => {

    it('respond with error when category parameter incorrect', function (done) {
      //Init
      const useCaseContainer = {};
      useCaseContainer.getRootCategoriesUsecase = {};


      const apiRouter = new ApiRouter(useCaseContainer, {}, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/listCategory/ti')
        .expect(400, done);
    });

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

  afterEach(() => {
    // Restore the default sandbox here
    sinon.resetHistory();
  });
});
