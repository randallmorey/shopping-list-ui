import Route from '@ember/routing/route';
import RealtimeRouteMixin from '../../mixins/realtime-route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ListShopRoute extends Route.extend(RealtimeRouteMixin) {

  // =methods

  /**
   * Returns all items, categories, stores, and store categories.
   * @returns {Object}
   */
  model() {
    return hash({
      stores: this.store.findAll('store'),
      storeItemCategories: this.store.findAll('store-item-category')
    }).then(obj => Object.assign({}, this.modelFor('list'), obj));
  }

  /**
   * Subscribe to realtime updates on shopping list items.
   * @param {Object} model
   */
  afterModel(model) {
    this.subscribe(model.items);
    return super.afterModel(...arguments);
  }

  // =actions

  /**
   * Toggles purchased property of record.
   * @param {ItemModel}
   */
  @action
  togglePurchase(record) {
    record.toggleProperty('purchased');
    record.save();
  }

}
