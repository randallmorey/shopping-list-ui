import Route from '@ember/routing/route';

/**
 * A route to load shopping lists.
 */
export default class ShoppingListsRoute extends Route {

  // =methods

  /**
   * Returns all shopping lists.
   * @returns {ShoppingListModel[]}
   */
  model() {
    return this.store.findAll('shopping-list');
  }

}
