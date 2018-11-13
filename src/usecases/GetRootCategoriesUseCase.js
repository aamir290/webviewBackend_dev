const UseCase = require('./UseCase');

/**
 * Base class for use case.
 * Add common methods for use case.
 * Extends EventEmitter to handle different response for method :
 *    - SUCCESS => response OK
 *    - ERROR => error in process
 */
class GetRootCategoriesUseCase extends UseCase{

  constructor(chatBotRepository){
    super(['SUCCESS', 'ERROR']);

    this.chatBotRepository = chatBotRepository;
  }

  /**
   * Launch use case task
   */
  async execute(){
    const { SUCCESS, ERROR } = this.events;

    try {
      const categories = await this.chatBotRepository.getRootCategories();
      this.emit(SUCCESS, categories);
    }catch (e) {
      this.emit(ERROR);
    }

  }
}

module.exports = GetRootCategoriesUseCase;