import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

/**
 * Exposes the active pane service to the context.
 */
export default class ShoppingListsShoppingListShoppingListItemsController
  extends Controller {

  // =services

  @service activePane;

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
