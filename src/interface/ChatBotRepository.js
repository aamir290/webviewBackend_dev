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
  constructor(localSource, distantSource) {
    this._localSource = localSource;
    this._distantSource = distantSource;
  }

  /**
   * Return array of categories from chatbot repository.
   * Empty array if no categories.
   * Throw error if error occurs (distant server unreachable, network unavailable,...)
   * @returns array of root category, undefined if error occurs
   */
  async getRootCategories() {
    if (this._localSource && this._localSource.getRootCategories) {
      return this._localSource.getRootCategories();
    } else {
      throw new Error('LocalSource has no method getRootCategories');
    }
  }

  /**
   * Test if categorie exists in list or not.
   * @param categoryId id of category to test
   * @returns {boolean} true if category exists, false otherwise
   * @throws Error if categoryId parameter incorrect
   */
  async isCategoryInList(categoryId) {
    if (this._localSource && this._localSource.isCategoryInList) {
      return await this._localSource.isCategoryInList(categoryId);
    }else{
      throw new Error('LocalSource has no method isCategoryInList');
    }
  }
}

module.exports = ChatBotRepository;
