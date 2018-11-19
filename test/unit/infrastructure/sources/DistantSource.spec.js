/**
 * Unit tests for Distant source
 */
const sinon = require('sinon');
const DistantSource = require('../../../../src/infrastructure/sources/DistantSource');
const config = require('../../../../config/config');

//Mock http client
var request = require('superagent');
var configSuperAgent = require('../../testData/superAgentListCategory.config');
require('superagent-mock')(request, configSuperAgent);

describe('DistantSource', () => {

  let stubLogger;

  before(() => {
    stubLogger = {};
    stubLogger.error = sinon.stub();
    stubLogger.debug = sinon.stub();
  });

  context('when getting chatbot list for given category', () => {
    it('return chatbot array when category correct', async () => {
      const distantSource = new DistantSource(config, stubLogger);
      const chatbots = await distantSource.listCategory('finabank');

      chatbots.should.be.eql(
        {
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
            },
            {
              category: 'finabank',
              description: 'Trust our bank, we will use your money',
              icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/piggy-bank-icon.png',
              id: 'mybank@botplatform.orange.fr',
              name: 'Piggy Bank'
            },
            {
              category: 'finabank',
              description: 'Banking -- this would normally be a list of Chatbots related to Banking;',
              icon: 'https://obc-c.kmt.orange.com/c/10b1da91b67d95a2e1c903dee4392031_5bea95b777a45_chatbot_01.jpg',
              id: 'banking.chatbot.trials@botplatform.orange.com',
              name: 'Banking Chatbot'
            }
          ]
        }
      );
    });

    it('return error when no category parameter', async () => {
      const distantSource = new DistantSource(config, stubLogger);
      await distantSource.listCategory().should.be.rejected;
    });

    it('return error when error with server', async () => {
      const distantSource = new DistantSource(config, stubLogger);
      await distantSource.listCategory('educ').should.be.rejected;
    });

    it('set server url to loaclhost when incorrect Config', async () => {
      const distantSource = new DistantSource({}, stubLogger);
      distantSource._urlServer.should.eql('http://localhost');
    });
  });

  afterEach(() => {
    sinon.resetHistory();
  });
});
