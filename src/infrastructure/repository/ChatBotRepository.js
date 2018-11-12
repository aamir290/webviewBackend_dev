/**
 * Concrete implementation for chatbot repository.
 * Perform request on distant chatbot  repository.
 */
class ChatBotRepository {

  constructor(){
  }

  /**
   * Return array of categories from chatbot repository.
   * Empty array if no categories.
   * Throw error if error occurs (distant server unreachable, network unavailable,...)
   * @returns {Promise<void>}
   */
  async getAllCategories(){
    return undefined;
  }
}

module.exports = ChatBotRepository;
