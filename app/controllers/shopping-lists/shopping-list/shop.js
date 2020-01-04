import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class ShoppingListsShoppingListShopController extends Controller {

  // =properties

  /**
   * Groups shopping list items by category (for those with categories).
   * @type {Array}
   */
  @computed('model.shoppingListItems.@each.category')
  get categoryGroups() {
    const categorized = this.model.shoppingListItems
      .filter(item => item.get('category.content'));
    return this.model.categories.sortBy('name').map(category => ({
      category,
      shoppingListItems:
        categorized.filter(item => item.get('category.id') === category.id)
    })).filter(group => group.shoppingListItems.length);
  }

  /**
   * Lists only shopping list items *without* categories.
   * @type {ShoppingListItemModel[]}
   */
  @computed('model.shoppingListItems.@each.category')
  get uncategorized() {
    return this.model.shoppingListItems
      .filter(item => !item.get('category.content'));
  }

}
