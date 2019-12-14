import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

/**
 * A route to load and display all items.
 * @class ItemsRoute
 * @augments Route
 */
export default class ItemsRoute extends Route {
  @service confirmations;
  // =methods

  /**
   * Returns all items.
   * @returns {ItemModel[]}
   */
  model() {
    return this.store.findAll('item');
  }

  @action
  delete() {
    this.confirmations.getConfirmation('delete')
      .then(() => {
        console.log('user confirmed, do delete');
      })
      .catch(() => {
        console.log('user dismissed, do not delete');
      });
  }

  @action
  cancel() {
    this.confirmations.getConfirmation('abandon')
      .then(() => {
        console.log('user confirmed, do rollback');
      })
      .catch(() => {
        console.log('user dismissed, do not rollback');
      });
  }

}
