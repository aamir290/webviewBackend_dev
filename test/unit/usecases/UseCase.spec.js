/**
 * Unit tests for Usecase
 */
const {expect} = require('chai');
const UseCase = require('../../../src/usecases/UseCase');

describe('UseCase', () => {

  context('when adding callback to events', () => {
    let useCase;

    before(() => {
      useCase = new UseCase(['SUCCESS', 'SUCCESS2']);
    });

    it('add callback to success event', (done) => {
      useCase.on(useCase.events.SUCCESS, () => {
      });

      done();
    });

    it('throws error for unknown event', (done) => {
      expect(() =>
        useCase.on('HELLO', () => {
        }))
        .to.throw('Event HELLO doesn\'t exists for UseCase');
      done();
    });
  });
});
