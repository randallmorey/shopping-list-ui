import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { action } from '@ember/object';

export default class ShoppingListsShoppingListShopRoute extends Route {
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
      // for now, return all shopping list items rather than filtering by list,
      // since only 1 list may exist
      shoppingListItems: this.store.findAll('shopping-list-item')
    });
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
