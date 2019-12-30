import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../mixins/persitence-route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class StoresNewRoute extends Route.extend(PersitenceRouteMixin) {
  // =services

  @service activePane;

  // =methods

  /**
   * Returns an new unsaved item.
   * @returns {ItemModel}
   */
  model() {
    return this.store.createRecord('store')
  }

  /**
   * Redirect to items route, replacing the history item.  We do not want
   * the back button to reach the now-stale new route.
   */
  afterPersistence() {
    this.replaceWith('stores.store', this.currentModel);
  }

  /**
   * Redirect to items route.
   */
  afterCancel() {
    this.transitionTo('stores');
  }

  /**
   * Activates the body pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateBody();
  }
}
