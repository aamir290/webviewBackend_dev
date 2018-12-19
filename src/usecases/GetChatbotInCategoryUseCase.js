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

    if (!logger) throw new Error('Missing logger');
    this.logger = logger;
  }

  /**
   * Launch use case task.
   * test if category exists : if yes, launch request to server and format result.
   * If category doesn't exist, throw error.
   * @param categoryId category id to retrive data from. If undefined, return all chatbots
   * @param accessChannel access channel
   */
  async execute(categoryId, accessChannel) {
    const {SUCCESS, NOT_FOUND, PARAMETER_ERROR} = this.events;
    try {
      let isInCategoryList;
      if(categoryId) {
        // Category : check if exists
        isInCategoryList = await this.chatBotRepository.isCategoryInList(categoryId);
      }else{
        //no parameter => return all chatbots
        isInCategoryList = true;
      }

      if (isInCategoryList) {
        const chatbotArray = await this.chatBotRepository.getListCategory(categoryId, accessChannel);

        this.emit(SUCCESS, chatbotArray);
      } else {
        this.emit(NOT_FOUND);
      }
    } catch (e) {
      this.logger.debug('GetChatbotInCategoryUseCase - catch : ' + e);
      this.emit(PARAMETER_ERROR, 'Incorrect category id parameter');
    }
  }
}

module.exports = GetChatbotInCategoryUseCase;
