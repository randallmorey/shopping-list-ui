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
