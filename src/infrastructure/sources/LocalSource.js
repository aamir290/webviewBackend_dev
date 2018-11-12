/**
 * Return data from local elements.
 * Could be constant or database from current repository.
 */
const Category = require('../../domain/Category');
const jsonCategories = require('../../../data/categories');

class LocalSource {

  constructor(){

  }

  /**
   * Return array of categories from locals constant
   * Empty array if no categories.
   * @returns {Promise<void>}
   */
  async getAllCategories(){
    const categories = [];

    jsonCategories.forEach((currentCategory)=>{
      categories.push(new Category(currentCategory.id, currentCategory.name));
    });

    return categories;
  }
}

module.exports = LocalSource;
