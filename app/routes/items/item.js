import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../mixins/persitence-route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * A route to edit an item by ID and handle update and delete persistence.
 * @augments Route
 * @augments PersitenceRouteMixin
 */
export default class ItemsItemRoute extends Route.extend(PersitenceRouteMixin) {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns an item by ID.
   * @returns {ItemModel}
   */
  model(params) {
    return this.store.findRecord('item', params.item_id);
  }

  /**
   * Redirect to items route.
   */
  afterPersistence() {
    this.transitionTo('items');
  }

  /**
   * Redirect to items route.
   */
  afterCancel() {
    this.transitionTo('items');
  }

  /**
   * Activates the body pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateBody();
  }

}
