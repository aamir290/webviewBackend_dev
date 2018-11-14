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
    super(['SUCCESS', 'NOT_FOUND', 'PARAMETER_ERROR']);

    this.chatBotRepository = chatBotRepository;
  }

  /**
   * Launch use case task
   */
  async execute(categoryId){
    const { SUCCESS, NOT_FOUND, PARAMETER_ERROR} = this.events;

    if(categoryId){
      try{
        const isInCategoryList = await this.chatBotRepository.isCategoryInList(categoryId);
        if(isInCategoryList){
          const chatbotArray = await this.chatBotRepository.getListCategory(categoryId);
          this.emit(SUCCESS, chatbotArray);
        }else{
          this.emit(NOT_FOUND);
        }
      }catch (e) {
        this.emit(PARAMETER_ERROR, 'Incorrect category id parameter');
      }
    }else{
      this.emit(PARAMETER_ERROR, 'Incorrect category id parameter');
    }
  }
}

module.exports = GetChatbotInCategoryUseCase;
