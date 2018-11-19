/**
 * Unit tests for Server
 */

const sinon = require('sinon');
const Server = require('../../../src/infrastructure/Server');
const express = require('express');

describe('Server', () => {

  context('when launching application', () => {
    it('starts server with correct config', async () => {
      const config = {};
      config.port = 4000;
      config.host = '127.0.0.1';

      const logger = {};
      logger.info = sinon.stub();

      const server = new Server(express.Router(), config, logger);
      await server.start();

      logger.info.should.have.been.calledTwice;
      logger.info.should.have.been.calledWith('Listening at 127.0.0.1:4000');

    });
  });
});
