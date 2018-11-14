const UseCase = require('./UseCase');

/**
 * Get chatbot list stored in given categorie.
 * Launch request to chatbotrepository and return categorie list, if exists.
 * Extends EventEmitter to handle different response for method :
 *    - SUCCESS => response OK
 *    - NOT_FOUND => unknown category
 *    - PARAMETER_ERROR => error with category parameter (+ error message)
 *    - ERROR => error in process
 */
class GetChatbotInCategoryUseCase extends UseCase{

  constructor(chatBotRepository){
    super(['SUCCESS', 'NOT_FOUND', 'PARAMETER_ERROR', 'ERROR']);

    this.chatBotRepository = chatBotRepository;
  }

  /**
   * Launch use case task
   */
  async execute(categoryId){
    const { SUCCESS, NOT_FOUND, PARAMETER_ERROR, ERROR } = this.events;

    if(categoryId){
    }else{
      this.emit(PARAMETER_ERROR, 'Incorrect category id parameter');
    }
  }
}

module.exports = GetChatbotInCategoryUseCase;
