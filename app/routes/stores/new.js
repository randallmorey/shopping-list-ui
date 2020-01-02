import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../mixins/persitence-route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * A route to edit a new unsaved store and handle create persistence.
 * @augments Route
 * @augments PersitenceRouteMixin
 */
export default class StoresNewRoute extends Route.extend(PersitenceRouteMixin) {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns an new unsaved store.
   * @returns {StoreModel}
   */
  model() {
    return this.store.createRecord('store')
  }

  /**
   * Redirect to stores route, replacing the history.  We do not want
   * the back button to reach the now-stale new route.
   */
  afterPersistence() {
    this.replaceWith('stores.store', this.currentModel);
  }

  /**
   * Redirect to stores route.
   */
  afterCancel() {
    this.transitionTo('stores');
  }

  // =actions

  /**
   * Activates the body pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateBody();
  }

}
