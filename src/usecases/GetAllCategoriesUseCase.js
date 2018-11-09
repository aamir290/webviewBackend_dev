const UseCase = require('./UseCase');

/**
 * Base class for use case.
 * Add common methods for use case.
 * Extends EventEmitter to handle different response for method.
 */
class GetAllCategoriesUseCase extends UseCase{

  constructor(){
    super();
  }

  /**
   * Launch use case task
   */
  async execute(){
    const { SUCCESS, ERROR } = this.events;

    console.log("before emit event");
    this.emit(SUCCESS);
    console.log("after emit event");
  }
}
GetAllCategoriesUseCase.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllCategoriesUseCase;
