import Route from '@ember/routing/route';
import I18nMixin from 'ember-i18next/mixins/i18n';
import LngDetector from 'i18next-browser-languagedetector';

/**
 * The top-level application route handles initializations, e.g. of i18n.
 * @augments Route
 * @augments I18nMixin
 */
export default class ApplicationRoute extends Route.extend(I18nMixin) {

  // =methods

  /**
   * Initializes i18next.
   */
  async beforeModel() {
    super.beforeModel(...arguments);
    await this.i18n.i18next.use(LngDetector);
    return this.i18n.initLibraryAsync();
  }

}
