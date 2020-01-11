import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../../mixins/persitence-route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * A route to load and display all shopping list items.
 * @augments Route
 * @augments PersitenceRouteMixin
 */
export default class ListManageItemRoute extends
  Route.extend(PersitenceRouteMixin) {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns a shopping list item by ID.
   * @param {Object} params
   * @returns {ItemModel}
   */
  model(params) {
    const id = params.item_id;
    return this.store.findRecord('item', id);
  }

  /**
   * If the item is at 0 quantity, it is first incremented to 1 and saved
   * before redirecting back to items.  Only items with a quantity of 1 or
   * greater enter the route, for convenience.
   * @param {ItemModel} model
   */
  redirect(model) {
    if (model.quantity === 0) {
      model.quantity = 1;
      model.save();
      this.transitionTo('list.manage');
    }
  }

 /**
  * Redirect to list manage.
  */
  afterPersistence() {
   this.transitionTo('list.manage');
  }

  /**
   * Redirect to list manage.
   */
  afterCancel() {
   this.transitionTo('list.manage');
  }

  // =actions

  /**
   * Activates the sidebar pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateBody();
  }

}
