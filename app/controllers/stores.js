import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

/**
 * Exposes the active pane service to the context.
 */
export default class ItemsController extends Controller {

  // =services

  @service activePane;

  // =properties

  /**
   * List of saved (non-new) stores.
   * @type {StoreModel[]}
   */
  get stores() {
    const stores = this.model.filter(store => !store.isNew);
    return stores.sortBy('name')
  }

}
