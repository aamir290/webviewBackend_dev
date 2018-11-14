/**
 * Return data from local elements.
 * Could be constant or database from current repository.
 */
const Category = require('../../domain/Category');
const path = require('path');

class LocalSource {

  /**
   * Initiate local source
   * @param dataPath path to local data
   * @param logger logger
   */
  constructor(dataPath, logger){
    this.logger = logger;

    try {
      this.jsonCategories = require(path.resolve(path.join(dataPath, 'categories')));
    }catch (e) {
      this.logger.error('Error while loading local source file');
      this.logger.error(e);
      this.jsonCategories = [];
    }

  }

  /**
   * Return array of root categories (not subcategories)
   * Empty array if no categories.
   * @returns categories array
   */
  getRootCategories(){
    const categories = [];

    this.jsonCategories.forEach((currentCategory)=>{
      categories.push(new Category(currentCategory.id, currentCategory.name));
    });

    return categories;
  }

}

module.exports = LocalSource;
