import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ItemsItemCategoriesCategoryRoute extends Route {

  // =methods

  /**
   * Returns a category by ID.
   * @returns {ItemCategoryModel}
   */
  model(params) {
    return this.store.findRecord('item-category', params.category_id);
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
