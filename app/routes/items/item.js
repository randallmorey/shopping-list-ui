import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * A route to load and display a single item.
 */
export default class ItemsItemRoute extends Route {

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

  // =actions

  /**
   * Activates the body pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateBody();
  }

  /**
   * If valid, saves the record.
   */
  @action
  submit() {
    // TODO
    console.log('submit');
  }

  /**
   * Rollback any changes to the record.
   */
  @action
  cancel() {
    // TODO
    console.log('cancel');
  }
}
