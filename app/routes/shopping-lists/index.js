import Route from '@ember/routing/route';

/**
 * Checks for an existing shopping list and transitions to it.
 * If no lists exist, creates one and transitions to it.
 */
export default class ShoppingListsIndexRoute extends Route {

  // =methods

  /**
   * Checks for an existing shopping list and transitions to it.
   * If no lists exist, creates one and transitions to it.
   * @param {ShoppingListModel[]} model
   */
  async redirect({firstObject}) {
    if (firstObject) {
      this.transitionTo('shopping-lists.shopping-list', firstObject);
    } else {
      const list = this.store.createRecord('shopping-list');
      await list.save();
      this.transitionTo('shopping-lists.shopping-list', list);
    }
  }

}
