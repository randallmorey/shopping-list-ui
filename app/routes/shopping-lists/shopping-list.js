import Route from '@ember/routing/route';

/**
 * Finds a shopping list.
 */
export default class ShoppingListsShoppingListRoute extends Route {

  // =methods

  /**
   * Returns a shopping list by ID.
   * @returns {ShoppingListModel}
   */
  model(params) {
    return this.store.findRecord('shopping-list', params.shopping_list_id);
  }

}
