import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

/**
 * A collection of helpful persistence-related actions.  Intended to be used
 * with routes which return a single {Model} record via their model() hook.
 */
export default Mixin.create({ // eslint-disable-line ember/no-new-mixins

  // =services

  confirmations: service(),

  // =methods

  /**
   * Classes implementing this mixin may override this method to
   * handle what happens next, such as redirecting.
   * @function afterPersistence
   */

  // =actions

  actions: {
    /**
     * Requests abandon confirmation from user if record has changes.
     * @param {Transition} transition
     */
    willTransition(transition) {
      this.send('confirmAbandon', this.currentModel, transition);
    },

    /**
     * Requests abandon confirmation from user if record has changes.
     * @param {Model} record
     * @param {Transition} transition
     */
    confirmAbandon(record, transition) {
      /* istanbul ignore else  */
      if (record.isDirty && !this.abandonConfirmation) {
        transition.abort();
        this.abandonConfirmation = this.confirmations.getConfirmation('abandon');
        this.abandonConfirmation
          .then(() => {
            record.errors.clear();
            record.rollback();
            transition.retry();
          })
          .finally(() => delete this.abandonConfirmation);
      }
    },

    /**
     * If dirty, valid, and not already saving, save the record.
     * If save is successful, calls afterPersistence().
     * @param {Model} record
     */
    async submit(record) {
      // Only do save if the model has changes that are valid.
      const canSave =
        record.isDirty &&
        record.validate() &&
        !record.isSaving;

      /* istanbul ignore else  */
      if (canSave) {
        await record.save();
        this.afterPersistence();
      }
    },

    /**
     * Clear errors, rollback attributes and relationships,
     * and redirect to items route.  Redirect to items.
     * @param {Model} record
     */
    cancel(record) {
      record.errors.clear();
      record.rollback();
      this.afterPersistence();
    },

    /**
     * Requests delete confirmation from user.  If confirmed, destroys
     * record and redirects to items.
     * @param {Model} record
     */
    delete(record) {
      /* istanbul ignore else  */
      if (!this.deleteConfirmation) {
        this.deleteConfirmation = this.confirmations.getConfirmation('delete');
        this.deleteConfirmation
          .then(() => record.destroyRecord())
          .then(() => this.afterPersistence())
          .finally(() => delete this.deleteConfirmation);
      }
    }
  }
});
