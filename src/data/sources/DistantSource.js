/**
 * Return data from distant ChatBot Directory server
 */
const request = require('superagent');

class DistantSource {

  /**
   * Initiate distant source
   * @param config application configuration
   * @param logger alogger
   */
  constructor(config, logger) {
    this._urlServer = config.chatBotRepositoryServerUrl || 'http://localhost';

    if(!logger) throw new Error('Missing logger');
    this._logger = logger;
  }

  /**
   * Return array of chatbots for given category
   * Empty array if no chatbots for given category
   * @param categoryId id of category to retrieve chatbots from
   * @returns promises with ctabots array
   */
  async listCategory(categoryId) {
    //Create url
    if (categoryId === undefined) throw new Error('Incorrect parameter category id');
    const url = this._urlServer + '/listCategory/' + categoryId + '/inapp';

    //Request
    this._logger.debug('DistantSource - listCategory request : '+url);
    const res = await request.get(url);
    return res.body;
  }

  /**
   * Return array of all chatbots from repository
   * @returns promises with chatbots array
   */
  async list() {
    const url = this._urlServer + '/list';

    //Request
    this._logger.debug('DistantSource - list request : '+url);
    const res = await request.get(url);
    return res.body;
  }

  /**
   * Return array of chatbots for given search keyword
   * Empty array if no chatbots for given keyword
   * @param keyword keyword to search for
   * @returns promises with chatbots array
   */
  async search(keyword) {
    //Create url
    if (keyword === undefined) throw new Error('Incorrect parameter keyword');
    const url = this._urlServer + '/searchChatbots/' + keyword;

    //Request
    this._logger.debug('DistantSource - search request : '+url);
    const res = await request.get(url);
    return res.body;
  }

}

module.exports = DistantSource;
