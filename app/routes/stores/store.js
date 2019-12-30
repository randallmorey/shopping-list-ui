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
   * Returns an store by ID.
   * @returns {StoreModel}
   */
  model(params) {
    return this.store.findRecord('store', params.store_id);
  }

  /**
   * Preload all item categories as well as this store's store item categories.
   * @param {Store} model
   */
  afterModel(model) {
    return model.get('categories')
      .then(() => this.store.findAll('item-category'))
      .then(itemCategories => this.setProperties({itemCategories}));
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
