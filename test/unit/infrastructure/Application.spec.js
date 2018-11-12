/**
 * Unit tests for Application
 */
const {expect} = require('chai');
const sinon = require('sinon');
const Application = require('../../../src/infrastructure/Application');

describe('Application', () => {

  context('when launching application', () => {
    it('call server start once', () => {
      const mockServer = {};
      mockServer.start = sinon.spy();
      const application = new Application(mockServer);

      application.start();

      expect(mockServer.start).to.have.been.calledOnce;
    });
  });


  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
