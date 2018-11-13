/**
 * Concrete implementation for chatbot repository.
 * Perform request on distant chatbot  repository.
 */
class ChatBotRepository {

  /**
   * Create a chatbot repository
   * @param localSource local sources for data
   * @param distantSource distant soruce for data, aka server
   */
  constructor(localSource, distantSource){
    this._localSource = localSource;
    this._distantSource = distantSource;
  }

  /**
   * Return array of categories from chatbot repository.
   * Empty array if no categories.
   * Throw error if error occurs (distant server unreachable, network unavailable,...)
   * @returns {Promise<void>}
   */
  async getRootCategories(){
    if(this._localSource && this._localSource.getRootCategories) {
      return this._localSource.getRootCategories();
    }
  }
}

module.exports = ChatBotRepository;
