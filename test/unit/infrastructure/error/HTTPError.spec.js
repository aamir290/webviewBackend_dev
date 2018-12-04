/**
 * Unit tests for HTTP Error
 */
const HTTPError = require('../../../../src/infrastructure/error/HTTPError');

describe('HTTPError', () => {

  context('when initiate successful', () => {
    it('init error correctly', () => {
      const error = new HTTPError(400, 'this is an error');

      error.status.should.be.eql(400);
      error.message.should.be.eql('this is an error');
    });

  });

  context('when initiate unsuccessful', () => {
    it('set status to 400 when no status', () => {
      const error = new HTTPError(400, 'this is an error');

      error.status.should.be.eql(400);
    });

    it('throws error when status < 0', () => {
      (()=>{
        new HTTPError(-10);
      }).should
        .throw('Incorrect use of HTTPError - invalid status');
    });
    it('throws error when status > 600', () => {
      (()=>{
        new HTTPError(607);
      }).should
        .throw('Incorrect use of HTTPError - invalid status');
    });

    it('throws error when status is a string', () => {
      (()=>{
        new HTTPError('titi');
      }).should
        .throw('Incorrect use of HTTPError - invalid status');
    });
  });
});
