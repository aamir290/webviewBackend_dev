/**
 * Return data from distant ChatBot Directory server
 */

class DistantSource {

  /**
   * Initiate distant source
   * @param config application configuration
   */
  constructor(config){
    this._urlServer = this.config.chatBotRepositoryServerUrl | 'http://localhost';
  }

  /**
   * Return array of chatbots for given category
   * Empty array if no chatbots for given category
   * @param categoryId id of category to retrieve chatbots from
   * @returns categories array
   */
  listCategory(categoryId){
    const chatbots = [];

    return chatbots;
  }

}

module.exports = DistantSource;
