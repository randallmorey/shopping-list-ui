import Route from '@ember/routing/route';

export default class ItemsItemCategoriesNewRoute extends Route {
  /**
   * Returns an new unsaved item.
   * @returns {ItemModel}
   */
  model() {
    return this.store.createRecord('item-category')
  }

}
