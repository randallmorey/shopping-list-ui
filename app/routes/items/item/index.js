import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * Handles item persistence and post-persistence actions.
 */
export default class ItemsItemIndexRoute extends Route {

  // =services

  @service confirmations;

  // =methods

  /**
   * Inserts categories into the context as `categories`.
   * @param {Controller} controller
   */
  setupController(controller) {
    super.setupController(...arguments);
    controller.set('categories', this.modelFor('items').categories);
  }

  // =actions

  /**
   * If dirty, valid, and not already saving, save the record.
   * If save is successful, redirect to items.
   */
  @action
  async submit() {
    // Only do save if the model has changes that are valid.
    const canSave =
      this.currentModel.isDirty &&
      this.currentModel.validate() &&
      !this.currentModel.isSaving;
    if (canSave) {
      await this.currentModel.save();
      this.transitionTo('items');
    }
  }

  /**
   * Clear errors, rollback attributes and relationships,
   * and redirect to items route.  Redirect to items.
   */
  @action
  cancel() {
    this.currentModel.errors.clear();
    this.currentModel.rollback();
    this.transitionTo('items');
  }

  /**
   * Requests delete confirmation from user.  If confirmed, destroys
   * record and redirects to items.
   */
  @action
  delete() {
    this.confirmations.getConfirmation('delete')
      .then(() => this.currentModel.destroyRecord())
      .then(() => this.transitionTo('items'))
  }
}
