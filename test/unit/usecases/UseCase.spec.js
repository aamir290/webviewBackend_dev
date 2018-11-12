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

    it('add callback to success event', () => {
      useCase.on(useCase.events.SUCCESS, () => {
      });
    });

    it('throws error for unknown event', () => {
      expect(() =>
        useCase.on('HELLO', () => {
        }))
        .to.throw('Event HELLO doesn\'t exists for UseCase');
    });
  });
});
