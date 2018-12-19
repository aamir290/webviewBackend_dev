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
  constructor(localSource, distantSource, logger) {
    this._localSource = localSource;
    this._distantSource = distantSource;

    if(!logger) throw new Error('Missing logger');
    this.logger = logger;
  }

  /**
   * Return array of categories from chatbot repository.
   * Empty array if no categories.
   * Throw error if error occurs (distant server unreachable, network unavailable,...)
   * @returns array of root category, undefined if error occurs
   * @throws Error if  incorrect localsource
   */
  async getCategories() {
    if (this._localSource && this._localSource.getCategories) {
      return this._localSource.getCategories();
    } else {
      throw new Error('LocalSource has no method getCategories');
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
   * @param accessChannel access channel
   * @returns {Promise<void>} array of chatbot (could be empty if no chatbot found)
   *  @throws Error if  incorrect distant source
   */
  async getListCategory(categoryId, accessChannel) {
    if(this._distantSource && this._distantSource.listCategory) {
      try{
        if(categoryId) {
          return await this._distantSource.listCategory(categoryId, accessChannel);
        }else{
          return await this._distantSource.list();
        }
      }catch(e){
        this.logger.debug('ChatBotRepository - getListCategory - error with distant source : '+e);
        throw new Error('DistantSource generate error while calling listCategory');
      }
    }else{
      throw new Error('DistantSource has no method listCategory or is called with wrong parameter');
    }
  }

  /**
   * Return list of chatbot associated with given keyword
   * @param keyword keyword for search request
   * @param categoryId catgeory id for search request. Let blank for no filtering on request id.
   * @param accessChannel access channel
   * @returns {Promise<void>} array of chatbot (could be empty if no chatbot found)
   *  @throws Error if incorrect distant source
   */
  async search(keyword, categoryId, accessChannel){
    if(this._distantSource && this._distantSource.search && keyword) {
      try{
        return await this._distantSource.search(keyword, categoryId, accessChannel);
      }catch(e){
        this.logger.debug('ChatBotRepository - search - error with distant source : '+e);
        throw new Error('DistantSource generate error while calling search');
      }
    }else{
      throw new Error('DistantSource has no method search or is called with wrong parameter');
    }
  }
}

module.exports = ChatBotRepository;
