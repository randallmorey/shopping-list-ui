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
   * If dirty and valid, save the record.
   */
  @action
  submit() {
    // Only do save if the model has changes that are valid.
    const canSave =
      this.currentModel.isDirty &&
      this.currentModel.validate() &&
      !this.currentModel.isSaving;
    if (canSave) this.currentModel.save();
  }

  /**
   * Clear errors, rollback attributes and relationships,
   * and redirect to items route.
   */
  @action
  cancel() {
    this.currentModel.errors.clear();
    this.currentModel.rollback();
    this.transitionTo('items');
  }
}
