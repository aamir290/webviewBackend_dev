/**
 * Represent a category for chatbots.
 */
class Category {

  /**
   * Create new category
   * @param id category's id
   * @param name category's name
   * @param subCategories subCategories (undefined if no sub Categories)
   */
  constructor(id, name, subCategories){
    this.id = id;
    this.name = name;
    this.subCategories = subCategories;
  }
}

module.exports = Category;
