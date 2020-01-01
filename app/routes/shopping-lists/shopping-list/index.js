import Route from '@ember/routing/route';

/**
 * This route always redirects to shopping list items
 */
export default class ShoppingListsShoppingListIndexRoute extends Route {

  // =methods

  /**
   * This route always redirects to shopping list items
   */
  async redirect() {
    this.transitionTo('shopping-lists.shopping-list.shopping-list-items');
  }

}
