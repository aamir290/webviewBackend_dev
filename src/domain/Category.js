/**
 * Represent a category for chatbots.
 */
class Category {

  /**
   * Create new category
   * @param id category's id
   * @param name category's name
   * @param icon icon associated with category.
   * @param subCategories subCategories (undefined if no sub Categories)
   */
  constructor(id, name, icon, subCategories){
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.subCategories = subCategories;
  }
}

module.exports = Category;
