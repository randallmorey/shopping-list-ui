import Route from '@ember/routing/route';
import I18nMixin from 'ember-i18next/mixins/i18n';
import LngDetector from 'i18next-browser-languagedetector';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route.extend(I18nMixin) {

  // =services

  @service confirmations;

  // =methods

  /**
   * Initializes i18next.
   */
  async beforeModel() {
    super.beforeModel(...arguments);
    await this.i18n.i18next.use(LngDetector);
    return this.i18n.initLibraryAsync();
  }

  /**
   * Requests abandon confirmation from user if record has changes.
   * @param {Model} record
   * @param {Transition} transition
   */
  @action
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
  }

}
