/**
 * Return data from local elements.
 * Could be constant or database from current repository.
 */
const path = require('path');

class LocalSource {

  /**
   * Initiate local source
   * @param dataPath path to local data
   * @param logger logger
   */
  constructor(dataPath, logger) {
    this.logger = logger;

    try {
      this.jsonCategories = require(path.resolve(path.join(dataPath, 'categories')));
    } catch (e) {
      this.logger.error('Error while loading local source file');
      this.logger.error(e);
      this.jsonCategories = [];
    }

  }

  /**
   * Return array of root categories (with no subcategories)
   * Empty array if no categories.
   * @returns Object categories array
   */
  getCategories() {
    const categories = [];

    this.jsonCategories.forEach((currentCategory) => {
      categories.push({
        id: currentCategory.id,
        name: currentCategory.name,
        icon: currentCategory.icon,
        subCategories: currentCategory.subCategories
      });
    });

    //Format answer
    return {
      result: categories
    };
  }

  /**
   * Test if given category present in category repository (category or subCategory)
   * @param categoryId id of category to test
   * @return true if present, false otherwise
   */
  isCategoryInList(categoryId) {
    if (categoryId && categoryId.length >= 4) {
      const rootCategory = categoryId.substring(0, 4);  //Get root category
      const found = this.jsonCategories.find(function (currentCategory) {
        if (currentCategory.id === rootCategory) {
          if (currentCategory.id === categoryId) {
            //It's the root category
            return true;
          } else {
            //It's a sub category
            return currentCategory.subCategories.find(function (currentSubCategory) {
              return currentSubCategory.id === categoryId;
            }) !== undefined;
          }
        }

      });

      return found !== undefined;
    } else {
      this.logger.error('isCategoryInList - Requesting categoryId : ' + categoryId);
      throw new Error('Missing parameter');
    }
  }

}

module.exports = LocalSource;
