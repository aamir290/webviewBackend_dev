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
   * @throws Error if  incorrect localsource
   */
  async getRootCategories() {
    if (this._localSource && this._localSource.getRootCategories) {
      return this._localSource.getRootCategories();
    } else {
      throw new Error('LocalSource has no method getRootCategories');
    }
  }

  /**
   * Test if category exists in list or not.
   * @param categoryId id of category to test
   * @returns {boolean} true if category exists, false otherwise
   * @throws Error if categoryId parameter incorrect or incorrect localsource
   */
  async isCategoryInList(categoryId) {
    if (this._localSource && this._localSource.isCategoryInList) {
      return await this._localSource.isCategoryInList(categoryId);
    }else{
      throw new Error('LocalSource has no method isCategoryInList');
    }
  }

  /**
   * Return list of chatbot associated with given catgeory id.
   * @param categoryId category id to retrive chatbot from
   * @returns {Promise<void>} array of chatbot (could be empty if no chatbot found)
   *  @throws Error if  incorrect distant source
   */
  async getListCategory(categoryId) {
    if(this._distantSource && this._distantSource.listCategory && categoryId) {
      try{
        return await this._distantSource.listCategory(categoryId);
      }catch(e){
        throw new Error('DistantSource has no method listCategory or is called with wrong parameter');
      }
    }else{
      throw new Error('DistantSource has no method listCategory or is called with wrong parameter');
    }
  }

  /**
   * Return category name associated to given id.
   * @param categoryId catgeory id to retrive name
   * @returns {Promise<void>}
   */
  async getCategoryName(categoryId){
    if(this._localSource && this._localSource.getCategoryName && categoryId){
      return this._localSource.getCategoryName(categoryId);
    }else{
      throw new Error('getCategoryName - incorrect category id : '+categoryId);
    }
  }
}

module.exports = ChatBotRepository;
