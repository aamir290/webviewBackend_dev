/**
 * Unit tests for Usecase
 */
const UseCase = require('../../../src/usecases/UseCase');

describe('UseCase', () => {

  context('when adding callback to events', () => {
    let useCase;

    before(() => {
      useCase = new UseCase(['SUCCESS', 'SUCCESS2']);
    });

    it('add callback to success event', () => {
      (() => {
        useCase.on(useCase.events.SUCCESS, () => {
        });
      }).should.not.throw;
    });

    it('throws error for unknown event', () => {
      (() => {
        useCase.on('HELLO', () => {
        });
      }).should.throw('Event HELLO doesn\'t exists for UseCase');
    });
  });
});
