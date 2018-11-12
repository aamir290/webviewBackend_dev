/**
 * Unit tests for Application
 */

const sinon = require('sinon');
const Application = require('../../../src/infrastructure/Application');

describe('Application', () => {

  context('when launching application', () => {
    it('call server start once', () => {
      const mockServer = {};
      mockServer.start = sinon.spy();
      const application = new Application(mockServer);

      application.start();

      mockServer.start.should.have.been.calledOnce;
    });
  });

  context('when launching application with incorrect server', () => {
    it('must throw error when no server',  async () => {
      const application = new Application();

      await application.start()
        .should.be.rejected;
    });

    it('must throw error when no start method on server',  async () => {
      const application = new Application({});

      await application.start()
        .should.be.rejected;
    });
  });


  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
