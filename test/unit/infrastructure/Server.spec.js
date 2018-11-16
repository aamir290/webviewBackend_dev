/**
 * Unit tests for Server
 */

const sinon = require('sinon');
const Server = require('../../../src/infrastructure/Server');

describe('Server', () => {

  context('when launching application', () => {
    it('starts server with correct config', () => {
      const config = {};
      config.port = 4000;
      config.host = '127.0.0.1';


    });
  });
});
