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

  /**
   * Test if given category present in category repository (category or subCategory)
   * @param categoryId id of category to test
   * @return true if present, false otherwise
   */
  isCategoryInList(categoryId){
    const found = this.jsonCategories.find(function(currentCategory) {
      return currentCategory.id === categoryId;
    });

    return found !== undefined;
  }

}

module.exports = LocalSource;
