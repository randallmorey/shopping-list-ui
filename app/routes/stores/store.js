import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../mixins/persitence-route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class StoresStoreRoute extends Route.extend(PersitenceRouteMixin) {
  // =services

  @service activePane;

  // =methods

  /**
   * Returns an item by ID.
   * @returns {StoreModel}
   */
  model(params) {
    return this.store.findRecord('store', params.store_id);
  }

  /**
   * Redirect to items route.
   */
  afterPersistence() {
    this.transitionTo('stores');
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
