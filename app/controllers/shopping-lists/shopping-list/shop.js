import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ShoppingListsShoppingListShopController extends
  Controller {

  // =properties

  /**
   * User-selected store.
   * @type {StoreModel}
   */
  @tracked
  selectedStore = null;

  // =computed

  @computed('selectedStore', 'model.stores.[]')
  get currentStore() {
    return this.selectedStore || this.model.stores.firstObject;
  }

  /**
   * Returns shopping list items that belong to a store item category for
   * the current store.
   * @type {ShoppingListItemModel[]}
   */
  @computed(
    'currentStore',
    'currentStore.categories.@each.itemCategory',
    'model.shoppingListItems.@each.category'
  )
  get categorized() {
    const store = this.currentStore;
    const storeItemCategories = store.get('categories');
    return this.model.shoppingListItems.filter(item =>
      storeItemCategories.findBy('itemCategory.id', item.get('category.id'))
    );
  }

  /**
   * Lists shopping list items that *do not* belong to a store item category
   * for the current store.
   * @type {ShoppingListItemModel[]}
   */
   @computed(
     'currentStore',
     'currentStore.categories.@each.itemCategory',
     'model.shoppingListItems.@each.category'
   )
  get uncategorized() {
    const store = this.currentStore;
    const storeItemCategories = store.get('categories');
    return this.model.shoppingListItems.filter(item =>
      !storeItemCategories.findBy('itemCategory.id', item.get('category.id'))
    );
  }

  /**
   * Groups shopping list items by store item category for the current store.
   * Groups are sorted by category order.
   * @type {Array}
   */
  @computed('categorized.[]', 'currentStore.categories.[]')
  get categoryGroups() {
    const categorized = this.categorized;
    const store = this.currentStore;
    const storeItemCategories = store.get('categories');
    return storeItemCategories.sortBy('order').map(category => ({
        category,
        shoppingListItems: categorized
          .filterBy('category.id', category.get('itemCategory.id'))
          .filter(item => item.quantity)
      }))
      .filter(group => group.shoppingListItems.length);
  }

}
