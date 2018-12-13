/**
 * Unit tests for apiRouter
 * //TODO : mock and stubs request/response and next elements
 */
const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const ApiRouter = require('../../../../src/infrastructure/routes/ApiRouter');
const getCategoriesUseCase = require('../../../../src/usecases/GetCategoriesUseCase');
const GetChatBotInCategoryUseCase = require('../../../../src/usecases/GetChatbotInCategoryUseCase');
const SimpleSearchUseCase = require('../../../../src/usecases/SimpleSearchUseCase');
const ChatBotRepository = require('../../../../src/data/ChatBotRepository');
const stubUtils = require('../../../testData/stubUtils');
const errorHandlerMiddlware = require('../../../../src/infrastructure/error/errorHandlerMiddleware');

describe('apiRouter ', function () {

  context('when initializing', () => {
    it('throws error when no logger', (done) => {
      try {
        new ApiRouter({}, {});
      } catch (e) {
        done();
        return;
      }
      done('fail - no error thrown');
    });
  });

  context('when calling private', () => {
    let stubReq, stubNext, stubLogger, useCaseContainer;

    beforeEach(() => {
      useCaseContainer = {};
      useCaseContainer.getChatbotInCategoryUseCase = {};
      useCaseContainer.simpleSearchUseCase = {};
      stubLogger = stubUtils.createStubLogger();

      stubReq = stubUtils.createStubRequest();

      stubNext = sinon.stub();
    });

    it('throws error when _search  has no keyword parameter', () => {
      //Init
      const apiRouter = new ApiRouter(useCaseContainer, {}, stubLogger);
      apiRouter._search(stubReq, {}, stubNext);

      stubNext.should.have.been.calledOnce;
      stubNext.args[0][0].status.should.be.eql(400);
      stubNext.args[0][0].message.should.be.eql('No param keyword');
    });
  });

  afterEach(() => {
    // Restore the default sandbox here
    sinon.reset();
  });
});

describe('apiRouter - GET /getDefaultCategories', function () {

  context('when query is successful', () => {
    it('respond with json with categories', function (done) {
      //Init
      const stubChatBotRepository = sinon.createStubInstance(ChatBotRepository, {
        getCategories: sinon.stub().resolves({
          result : [
            {
              id: 'educ',
              name: 'Education',
              icon: '<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m9.55077179 12.9155034-5.73943662-2.5187793v3.0798122c0 .2652582.15258216.5046948.38732395.6032864l5.3028169 2.3333333c.30985915.1314554.65492958.1314554.96478878 0l4.8920187-2.0798122c.2957747-.1244131.4906104-.42723.4906104-.7652582v-3.0774648l-5.4342723 2.4248826c-.2769953.1173709-.5868545.1173709-.86384981 0zm10.21596241-5.5046948-9.42723-4.33568075c-.2276995-.09859155-.48356809-.10093897-.71361504-.00234742l-9.42723004 4.29577465c-.2629108.11267606-.26525822.50469484-.00469484.62206573l9.44366197 4.34272299c.22065728.0985916.46713615.0985916.68779345.0023474l7.5868544-3.45774645v3.56338025c-.1784037.0610329-.298122.1760564-.298122.3075118v2.8380281h.0023474c.0164319.185446.2723005.3333334.584507.3333334.314554 0 .5680752-.1478874.5845071-.3333334h.0023474v-2.8403755c0-.1220658-.1032864-.2276996-.258216-.2910799v-3.85915489l1.2370892-.56338028c.2629108-.11737089.2629108-.50938967 0-.62206573z"/></svg>',
              subCategories: [
                {
                  id: 'educbook',
                  name: 'Books'
                }
              ]
            }
          ]
        }),
      });
      const useCaseContainer = {};
      useCaseContainer.getCategoriesUsecase = getCategoriesUseCase;


      const apiRouter = new ApiRouter(useCaseContainer, stubChatBotRepository, {});
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/getDefaultCategories')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          response.body.should.eql({
            result : [
              {
                id: 'educ',
                name: 'Education',
                icon: '<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m9.55077179 12.9155034-5.73943662-2.5187793v3.0798122c0 .2652582.15258216.5046948.38732395.6032864l5.3028169 2.3333333c.30985915.1314554.65492958.1314554.96478878 0l4.8920187-2.0798122c.2957747-.1244131.4906104-.42723.4906104-.7652582v-3.0774648l-5.4342723 2.4248826c-.2769953.1173709-.5868545.1173709-.86384981 0zm10.21596241-5.5046948-9.42723-4.33568075c-.2276995-.09859155-.48356809-.10093897-.71361504-.00234742l-9.42723004 4.29577465c-.2629108.11267606-.26525822.50469484-.00469484.62206573l9.44366197 4.34272299c.22065728.0985916.46713615.0985916.68779345.0023474l7.5868544-3.45774645v3.56338025c-.1784037.0610329-.298122.1760564-.298122.3075118v2.8380281h.0023474c.0164319.185446.2723005.3333334.584507.3333334.314554 0 .5680752-.1478874.5845071-.3333334h.0023474v-2.8403755c0-.1220658-.1032864-.2276996-.258216-.2910799v-3.85915489l1.2370892-.56338028c.2629108-.11737089.2629108-.50938967 0-.62206573z"/></svg>',
                subCategories: [
                  {
                    id: 'educbook',
                    name: 'Books'
                  }
                ]
              }
            ]
          });
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
        getCategories: sinon.stub().rejects(),
      });
      const useCaseContainer = {};
      useCaseContainer.getCategoriesUsecase = getCategoriesUseCase;


      const apiRouter = new ApiRouter(useCaseContainer, stubChatBotRepository, {});
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //execute test
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
      app.use(errorHandlerMiddlware); //don't log error with default handler

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
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/getDefaultCategories')
        .expect(400, done);
    });
  });
});

describe('apiRouter - GET /listCategory', function () {

  let stubRepository, useCaseContainer, stubLogger;

  before(() => {
    const stubIsInCategoryList= sinon.stub();
    stubIsInCategoryList.withArgs('tit').rejects();
    stubIsInCategoryList.withArgs('toto').resolves(false);
    stubIsInCategoryList.withArgs('fina').resolves(true);
    stubIsInCategoryList.withArgs('finabank').resolves(true);

    const stubGetListCategory= sinon.stub();
    stubGetListCategory.withArgs('finabank').rejects();
    stubGetListCategory.resolves({
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


    stubRepository = sinon.createStubInstance(ChatBotRepository, {
      isCategoryInList: stubIsInCategoryList,
      getListCategory: stubGetListCategory
    });

    useCaseContainer = {};
    useCaseContainer.getChatbotInCategoryUseCase = GetChatBotInCategoryUseCase;

    stubLogger = stubUtils.createStubLogger();
  });

  context('when query is successful', () => {

    it('respond with 404 when category not found', function (done) {
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/listCategory/toto')
        .expect(404, done);
    });

    it('respond with array of chatbots when category found', function (done) {
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, stubLogger);
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

    it('respond with chatbot list when parameter not set', function (done) {
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/listCategory')
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
      useCaseContainer.getCategoriesUsecase = {};


      const apiRouter = new ApiRouter(useCaseContainer, {}, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/listCategory/ti')
        .expect(400, done);
    });

    it('respond with error when error occurs in usecase', function (done) {
      //Init
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/listCategory/finabank')
        .expect(400, done);
    });

    it('respond with error when usecase not added to container', function (done) {
      //Init
      const useCaseContainer = {};

      const apiRouter = new ApiRouter(useCaseContainer, {}, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/listCategory/fina')
        .expect(400, done);
    });

    it('respond with error when no container', function (done) {
      //Init
      const apiRouter = new ApiRouter(undefined, {}, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

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

describe('apiRouter - GET /search', function () {

  let stubRepository, useCaseContainer, stubLogger;

  before(() => {

    const stubSearch= sinon.stub();
    stubSearch.withArgs('fina').resolves({
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
    stubSearch.withArgs('finabank').rejects();

    stubRepository = sinon.createStubInstance(ChatBotRepository, {
      search: stubSearch
    });

    useCaseContainer = {};
    useCaseContainer.simpleSearchUseCase = SimpleSearchUseCase;

    stubLogger = stubUtils.createStubLogger();
  });

  context('when query is successful', () => {
    it('respond with array of chatbots', function (done) {
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);

      //Test
      request(app)
        .get('/searchChatbot/fina')
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

    it('respond with error when parameter not set', function (done) {
      //Init
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/searchChatbot/')
        .expect(400, done);

    });

    it('respond with error when error occurs in usecase', function (done) {
      //Init
      const apiRouter = new ApiRouter(useCaseContainer, stubRepository, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/searchChatbot/finabank')
        .expect(400, done);
    });

    it('respond with error when usecase not added to container', function (done) {
      //Init
      const useCaseContainer = {};

      const apiRouter = new ApiRouter(useCaseContainer, {}, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/searchChatbot/fina')
        .expect(400, done);
    });

    it('respond with error when no container', function (done) {
      //Init
      const apiRouter = new ApiRouter(undefined, {}, stubLogger);
      const app = express();
      app.use(apiRouter.apiRouter);
      app.use(errorHandlerMiddlware); //don't log error with default handler

      //Test
      request(app)
        .get('/searchChatbot/fina')
        .expect(400, done);
    });
  });

  afterEach(() => {
    // Restore the default sandbox here
    sinon.resetHistory();
  });
});
