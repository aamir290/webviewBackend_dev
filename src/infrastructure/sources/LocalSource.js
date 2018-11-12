/**
 * Return data from local elements.
 * Could be constant or database from current repository.
 */
const Category = require('../../domain/Category');

class LocalSource {

  constructor(){

  }

  /**
   * Return array of categories from locals constant
   * Empty array if no categories.
   * @returns {Promise<void>}
   */
  async getAllCategories(){
    const defaultCategories = [
      'Education',
      'Finance',
      'Food & Drink',
      'Games',
      'Health & Fitness',
      'Lifestyle',
      'News & Media',
      'Entertainment',
      'Shopping',
      'Travel'
    ];
    const categories = [];

    defaultCategories.forEach((currentCategory)=>{
      categories.push(new Category(currentCategory));
    });

    return categories;
  }
}

module.exports = LocalSource;
