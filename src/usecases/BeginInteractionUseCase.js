const UseCase = require('./UseCase');

/**
 * Get deeplink to trigger conversation with boot
 * Launch request to chatbotrepository and return Intent/Deeplink list, if exists.
 * Extends EventEmitter to handle different response for method :
 *    - SUCCESS => response OK
 *    - ERROR => error in process
 *    - PARAMETER_ERROR => error with ID parameter (+ error message)
 */
class BeginInteractionUseCase extends UseCase {

  constructor(chatBotRepository, logger) {
    super(['SUCCESS', 'NOT_FOUND', 'PARAMETER_ERROR']);

    this.chatBotRepository = chatBotRepository;

    if (!logger) throw new Error('Missing logger');
    this.logger = logger;
  }

  /**
   * Launch use case task.
   * @param chatbotId chatbotId to contact
   * @param MSISDN user number phone
   * @param accessChannel access channel
   */
  async execute(chatbotId, telePhone, accessChannel) {
    const {SUCCESS, NOT_FOUND, PARAMETER_ERROR} = this.events;
    if(chatbotId) {
      try {
        this.logger.debug('BeginInteraction - start for : ' + chatbotId);
        const chatbotIds = await this.chatBotRepository.getChatbotId(chatbotId);
        const bot_id = chatbotIds.bot_id.toString();
        this.logger.debug('BeginInteraction - get : ' + bot_id);
        const link = 'https://extras.noprod-b.kmt.orange.com/bot-trigger.php?bot_id='+bot_id+'&MSISDNS='+telePhone+'&keyword=hi';

        this.emit(SUCCESS, link);
      } catch (e) {
        this.logger.debug('BeginInteraction - catch : ' + e);
        this.emit(NOT_FOUND, 'Incorrect getChatBotId');
      }
    }else {
      this.emit(PARAMETER_ERROR, 'Incorrect chatbotId parameter');
    }
  }
}

module.exports = BeginInteractionUseCase;
