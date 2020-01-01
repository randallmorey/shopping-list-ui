import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ShoppingListsShoppingListShoppingListItemsRoute extends Route {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns a shopping list by ID.
   * @returns {ShoppingListItemModel[]}
   */
  model(params) {
    return this.modelFor('shopping-lists.shopping-list').get('items');
  }

  /**
   * Render the sidebar in addition to the main template.
   */
  render() {
    super.render(...arguments);
    super.render('shopping-lists/shopping-list/shopping-list-items/-sidebar', {
      outlet: 'sidebar',
      into: 'shopping-lists/shopping-list/shopping-list-items'
    });
  }

  // =actions

  /**
   * Activates the sidebar pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateSidebar();
  }

}
