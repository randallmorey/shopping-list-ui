import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../../../mixins/persitence-route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class
  ShoppingListsShoppingListShoppingListItemsShoppingListItemRoute
  extends Route.extend(PersitenceRouteMixin) {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns a shopping list item by ID.
   * @param {Object} params
   * @returns {ShoppingListItemModel}
   */
  model(params) {
    const id = params.shopping_list_item_id;
    return this.store.findRecord('shopping-list-item', id);
  }

  /**
   * If the item is at 0 quantity, it is first incremented to 1 and saved
   * before redirecting back to items.  Only items with a quantity of 1 or
   * greater enter the route, for convenience.
   * @param {ShoppingListItemModel} model
   */
  redirect(model) {
    if (model.quantity === 0) {
      model.quantity = 1;
      model.save();
      this.transitionTo('shopping-lists.shopping-list.shopping-list-items');
    }
  }

  // =actions

  /**
   * Activates the body pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateBody();
  }

  // =methods

 /**
  * Redirect to shoppinh list items, replacing the history item. We do not want
  * the back button to reach the now-stale new route.
  */
  afterPersistence() {
   this.replaceWith('shopping-lists.shopping-list.shopping-list-items');
  }

  /**
  * Redirect to shoppinh list items route.
  */
  afterCancel() {
   this.transitionTo('shopping-lists.shopping-list.shopping-list-items');
  }
}
