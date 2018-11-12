/**
 * Return data from local elements.
 * Could be constant or database from current repository.
 */
class LocalSource {

  constructor(){

  }

  /**
   * Return array of categories from locals constant
   * Empty array if no categories.
   * @returns {Promise<void>}
   */
  async getAllCategories(){
    return [];
  }
}

module.exports = LocalSource;
