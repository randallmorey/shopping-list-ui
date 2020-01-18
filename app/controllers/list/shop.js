import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ListShopController extends Controller {

  // =properties

  /**
   * User-selected store.
   * @type {StoreModel}
   */
  @tracked
  selectedStore = null;

  // =computed

  @computed('model.items.[]', 'model.items.@each.{quantity,purchased}')
  get hasUnpurchasedItems() {
    return this.model.items
      .filter(item => (item.quantity > 0) && !item.purchased)
      .length;
  }

  @computed('selectedStore', 'model.stores.[]')
  get currentStore() {
    return this.selectedStore || this.model.stores.firstObject;
  }

  /**
   * Returns shopping list items that belong to a store item category for
   * the current store.
   * @type {ItemModel[]}
   */
  @computed(
    'currentStore',
    'currentStore.categories.{[],@each.itemCategory,@each.order}',
    'model.items.@each.{quantity,purchased,category}'
  )
  get categorized() {
    const store = this.currentStore;
    const storeItemCategories = store.get('categories');
    return this.model.items.filter(item =>
      storeItemCategories.findBy('itemCategory.id', item.get('category.id'))
    );
  }

  /**
   * Lists shopping list items that *do not* belong to a store item category
   * for the current store.
   * @type {ItemModel[]}
   */
   @computed(
     'currentStore',
     'currentStore.categories.{[],@each.itemCategory,@each.order}',
     'model.items.@each.{quantity,purchased,category}'
   )
  get uncategorized() {
    const store = this.currentStore;
    const storeItemCategories = store.get('categories');
    return this.model.items.filter(item =>
      !storeItemCategories.findBy('itemCategory.id', item.get('category.id')) &&
      item.quantity
    ).sortBy('name');
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
        items: categorized
          .filterBy('category.id', category.get('itemCategory.id'))
          .filter(item => item.quantity)
          .sortBy('name')
      }))
      .filter(group => group.items.length);
  }

}
