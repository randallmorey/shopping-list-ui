import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../mixins/persitence-route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * A route to edit a store by ID and handle update and delete persistence.
 * @augments Route
 * @augments PersitenceRouteMixin
 */
export default class StoresStoreRoute extends Route.extend(
  PersitenceRouteMixin
) {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns a store by ID.
   * @returns {StoreModel}
   */
  model(params) {
    return this.store.findRecord('store', params.store_id);
  }

  /**
   * Preload all item categories as well as this store's store item categories.
   * Sets loading state on the model and clears it when loading completes.
   * @param {StoreModel} model
   */
  afterModel(model) {
    this.setLoading(model);
    return model.get('categories').reload()
      .then(() => this.store.query('item-category', {}))
      .then(itemCategories => this.setProperties({itemCategories}))
      .finally(() => this.clearLoading(model));
  }

  /**
   * Inserts item categories into the context as `itemCategories`.
   * @param {Controller} controller
   */
  setupController(controller) {
    super.setupController(...arguments);
    controller.set('itemCategories', this.itemCategories);
  }

  /**
   * This is a potentially slow-loading route, so we want to indicate this to
   * the user somehow.  This scheme sets a transient property on the store
   * model, which is picked up by the stores index route.
   * @param {StoreModel} model
   */
  setLoading(model) {
    model.set('loadingStoreRoute', true);
  }

  /**
   * Sets the loading indicator to false.
   * @param {StoreModel} model
   */
  clearLoading(model) {
    model.set('loadingStoreRoute', false);
  }

  /**
   * Redirect to stores route.
   */
  afterPersistence() {
    this.transitionTo('stores');
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
