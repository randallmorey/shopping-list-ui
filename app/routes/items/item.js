import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * A route to load and display a single item.
 */
export default class ItemsItemRoute extends Route {

  // =services

  @service activePane;
  @service confirmations;

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
   * Requests abandon confirmation from user if record has changes.
   * @param {Transition} transition
   */
  @action
  willTransition(transition) {
    if (this.currentModel.isDirty) {
      transition.abort();
      this.confirmations.getConfirmation('abandon')
        .then(() => {
          this.currentModel.errors.clear();
          this.currentModel.rollback();
          transition.retry();
        });
    }
  }
}
