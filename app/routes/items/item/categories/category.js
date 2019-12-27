import Route from '@ember/routing/route';

export default class ItemsItemCategoriesCategoryRoute extends Route {
  /**
   * Returns a category by ID.
   * @returns {ItemCategoryModel}
   */
  model(params) {
    return this.store.findRecord('item-category', params.category_id);
  }
}
