/**
 * Return data from local elements.
 * Could be constant or database from current repository.
 */
const Category = require('../../domain/Category');
const path = require('path');

class LocalSource {

  constructor(dataPath){
    this.jsonCategories = require(path.resolve(path.join(dataPath, 'categories')));
  }

  /**
   * Return array of root categories (not subcategories)
   * Empty array if no categories.
   * @returns {Promise<void>}
   */
  async getRootCategories(){
    const categories = [];

    this.jsonCategories.forEach((currentCategory)=>{
      categories.push(new Category(currentCategory.id, currentCategory.name));
    });

    return categories;
  }
}

module.exports = LocalSource;
