import Route from '@ember/routing/route';

export default class
  ShoppingListsShoppingListShoppingListItemsShoppingListItemRoute
  extends Route {

  // =methods

  /**
   * Returns a shopping list item by ID.
   * @returns {ShoppingListItemModel}
   */
  model(params) {
    return this.store.findRecord('shopping-list-item',
      params.shopping_list_item_id);
  }

}
