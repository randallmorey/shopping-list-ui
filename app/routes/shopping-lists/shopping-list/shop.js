import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';
import RealtimeRouteMixin from '../../../mixins/realtime-route';

export default class ShoppingListsShoppingListShopRoute extends
  Route.extend(RealtimeRouteMixin) {
  // =methods

  /**
   * Returns all items, categories, and shopping list items.
   * @returns {Object}
   */
  model() {
    return hash({
      items: this.store.findAll('item'),
      categories: this.store.findAll('item-category'),
      stores: this.store.findAll('store'),
      storeItemCategories: this.store.findAll('store-item-category'),
      // for now, return all shopping list items rather than filtering by list,
      // since only 1 list may exist
      shoppingListItems: this.store.findAll('shopping-list-item')
    });
  }

  /**
   * Subscribe to realtime updates on shopping list items.
   * @param {Object} model
   */
  afterModel(model) {
    this.subscribe(model.shoppingListItems);
    return super.afterModel(...arguments);
  }

  /**
   * Toggles purchased property of record.
   * @param {ShoppingListItemModel}
   */
  @action
  togglePurchase(record) {
    record.toggleProperty('purchased');
    record.save();
  }
}
