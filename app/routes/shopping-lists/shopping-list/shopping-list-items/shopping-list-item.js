import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class
  ShoppingListsShoppingListShoppingListItemsShoppingListItemRoute
  extends Route {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns a shopping list item by ID.
   * @returns {ShoppingListItemModel}
   */
  model(params) {
    return this.store.findRecord('shopping-list-item',
      params.shopping_list_item_id);
  }


  // =actions

  /**
   * Activates the body pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateBody();
  }

}
