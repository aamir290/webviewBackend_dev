const UseCase = require('./UseCase');

/**
 * Base class for use case.
 * Add common methods for use case.
 * Extends EventEmitter to handle different response for method :
 *    - SUCCESS => response OK
 *    - ERROR => error in process
 */
class GetAllCategoriesUseCase extends UseCase{

  constructor(){
    super(['SUCCESS', 'ERROR']);
  }

  /**
   * Launch use case task
   */
  async execute(){
    const { SUCCESS, ERROR } = this.events;

    this.emit(SUCCESS);
  }
}

module.exports = GetAllCategoriesUseCase;
