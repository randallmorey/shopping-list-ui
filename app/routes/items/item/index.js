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

    /* istanbul ignore else  */
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
    /* istanbul ignore else  */
    if (!this.deleteConfirmation) {
      this.deleteConfirmation = this.confirmations.getConfirmation('delete');
      this.deleteConfirmation
        .then(() => this.currentModel.destroyRecord())
        .then(() => this.transitionTo('items'))
        .then(() => delete this.deleteConfirmation);
    }
  }

  /**
   * Requests abandon confirmation from user if record has changes.
   * @param {Transition} transition
   */
  @action
  willTransition(transition) {
    /* istanbul ignore else  */
    if (this.currentModel.isDirty && !this.abandonConfirmation) {
      transition.abort();
      this.abandonConfirmation = this.confirmations.getConfirmation('abandon');
      this.abandonConfirmation
        .then(() => {
          this.currentModel.errors.clear();
          this.currentModel.rollback();
          transition.retry();
        })
        .then(() => delete this.abandonConfirmation);
    }
  }
}
