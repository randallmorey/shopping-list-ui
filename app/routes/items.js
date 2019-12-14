import Route from '@ember/routing/route';

/**
 * A route to load and display all items.
 * @class ItemsRoute
 * @augments Route
 */
export default class ItemsRoute extends Route {
  
  // =methods

  /**
   * Returns all items.
   * @returns {ItemModel[]}
   */
  model() {
    return this.store.findAll('item');
  }

}
