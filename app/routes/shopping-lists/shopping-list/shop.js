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
      // for now, return all shopping list items rather than filtering by list,
      // since only 1 list may exist
      shoppingListItems: this.store.findAll('shopping-list-item')
    });
  }

  @action
  togglePurchase(model) {
    this.store.findRecord('shopping-list-item', model.id).then(record => {
      record.toggleProperty('purchased')
      record.save()
    })
  }
}
