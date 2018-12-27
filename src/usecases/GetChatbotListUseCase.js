const UseCase = require('./UseCase');

/**
 * Get chatbot list
 * Launch request to chatbotrepository and return categorie list, if exists.
 * Extends EventEmitter to handle different response for method :
 *    - SUCCESS => response OK
 *    - NOT_FOUND => unknown category
 */
class GetChatbotListUseCase extends UseCase {

  constructor(chatBotRepository, logger) {
    super(['SUCCESS', 'NOT_FOUND']);

    this.chatBotRepository = chatBotRepository;

    if (!logger) throw new Error('Missing logger');
    this.logger = logger;
  }

  /**
   * Launch use case task.
   * Launch request to server and format result.
   * @param accessChannel access channel
   */
  async execute( accessChannel) {
    const {SUCCESS, NOT_FOUND} = this.events;
    try {
      const chatbotArray = await this.chatBotRepository.getAllCategory(accessChannel);
      this.emit(SUCCESS, chatbotArray);
    } catch (e) {
      this.logger.debug('GetChatbotListUseCase - catch : ' + e);
      this.emit(NOT_FOUND);
    }
  }
}

module.exports = GetChatbotListUseCase;
