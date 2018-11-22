const UseCase = require('./UseCase');

/**
 * Get chatbot list stored in given categorie.
 * Launch request to chatbotrepository and return categorie list, if exists.
 * Extends EventEmitter to handle different response for method :
 *    - SUCCESS => response OK
 *    - NOT_FOUND => unknown category
 *    - PARAMETER_ERROR => error with category parameter (+ error message)
 */
class GetChatbotInCategoryUseCase extends UseCase {

  constructor(chatBotRepository, logger) {
    super(['SUCCESS', 'NOT_FOUND', 'PARAMETER_ERROR']);

    this.chatBotRepository = chatBotRepository;

    if(!logger) throw new Error('Missing logger');
    this.logger = logger;
  }

  /**
   * Launch use case task.
   * test if category exists : if yes, launch request to server and format result.
   * If catgeory doesn't exist, throw error.
   */
  async execute(categoryId) {
    const {SUCCESS, NOT_FOUND, PARAMETER_ERROR} = this.events;
    if (categoryId) {
      try {
        const isInCategoryList = await this.chatBotRepository.isCategoryInList(categoryId);
        if (isInCategoryList) {
          const chatbotArray = await this.chatBotRepository.getListCategory(categoryId);

          //add category name on each chatbot (based on id)
          await this._addCategoriesNames(chatbotArray);

          this.emit(SUCCESS, chatbotArray);
        } else {
          this.emit(NOT_FOUND);
        }
      } catch (e) {
        this.logger.debug('GetChatbotInCategoryUseCase - catch : '+e);
        this.emit(PARAMETER_ERROR, 'Incorrect category id parameter');
      }
    } else {
      this.emit(PARAMETER_ERROR, 'Incorrect category id parameter');
    }
  }

  /**
   * Add the category name on each chatbot.
   * @param chatBotArray array of chatbot return by repository
   * @private
   */
  _addCategoriesNames(chatBotArray) {
    chatBotArray.result.forEach(async (currentChaBot) => {
      try {
        currentChaBot.categoryName = await this.chatBotRepository.getCategoryName(currentChaBot.category);
      } catch (e) {
        //Do nothing
      }
    }, this);
  }
}

module.exports = GetChatbotInCategoryUseCase;
