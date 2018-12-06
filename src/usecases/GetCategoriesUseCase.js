const UseCase = require('./UseCase');

/**
 * Return list of categories and subcategories.
 * Extends EventEmitter to handle different response for method :
 *    - SUCCESS => response OK
 *    - ERROR => error in process
 */
class GetCategoriesUseCase extends UseCase{

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

      if(categories) {
        this.emit(SUCCESS, categories);
      }else{
        this.emit(ERROR);
      }
    }catch (e) {
      this.emit(ERROR);
    }
  }
}

module.exports = GetCategoriesUseCase;
