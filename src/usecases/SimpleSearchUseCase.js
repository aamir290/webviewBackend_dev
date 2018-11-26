const UseCase = require('./UseCase');

/**
 * Simple serach use case.
 * Perform a simple search on list of all chatbots.
 * Extends EventEmitter to handle different response for method :
 *    - SUCCESS => response OK
 *    - ERROR => error in process
 */
class SimpleSearchUseCase extends UseCase{

  constructor(chatBotRepository, logger){
    super(['SUCCESS', 'PARAMETER_ERROR']);

    this.chatBotRepository = chatBotRepository;

    if(!logger) throw new Error('Missing logger');
    this.logger = logger;
  }

  /**
   * Launch use case task
   * @param keyword keyword for search
   */
  async execute(keyword){
    const {SUCCESS, PARAMETER_ERROR} = this.events;
    if(keyword) {
      try {
        const chatbots = await this.chatBotRepository.search(keyword);

        if (chatbots) {
          this.emit(SUCCESS, chatbots);
        } else {
          this.emit(PARAMETER_ERROR);
        }
      } catch (e) {
        this.logger.debug('SimpleSearchUseCase - catch : '+e);
        this.emit(PARAMETER_ERROR, 'Incorrect keyword parameter');
      }
    } else {
      this.emit(PARAMETER_ERROR, 'Incorrect keyword parameter');
    }
  }
}

module.exports = SimpleSearchUseCase;
