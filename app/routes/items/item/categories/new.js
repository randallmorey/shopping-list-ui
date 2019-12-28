import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ItemsItemCategoriesNewRoute extends Route {

  // =methods

  /**
   * Returns an new unsaved item.
   * @returns {ItemModel}
   */
  model() {
    return this.store.createRecord('item-category')
  }

  // =actions

  /**
   * Requests abandon confirmation from user if record has changes.
   * @param {Transition} transition
   */
  @action
  willTransition(transition) {
    this.send('confirmAbandon', this.currentModel, transition);
  }

}
