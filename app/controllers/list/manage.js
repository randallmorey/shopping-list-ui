import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ListManageController extends Controller {

  // =services

  @service activePane;

  // =properties

  /**
   * Groups items by category.
   * @type {Array}
   */
  @computed('model.items.@each.category')
  get categoryGroups() {
    const categorized = this.model.items
      .filter(item => item.get('category.content'));
    return this.model.categories.sortBy('name').map(category => ({
      category,
      items:
        categorized
          .filter(item => item.get('category.id') === category.id)
          .sortBy('name')
    })).filter(group => group.items.length);
  }

  /**
   * Lists only shopping list items *without* categories.
   * @type {ItemModel[]}
   */
  @computed('model.items.@each.category')
  get uncategorized() {
    return this.model.items
      .filter(item => !item.get('category.content'))
      .sortBy('name');
  }

  /**
   * Returns true if list has items with quantity greater than 0.
   * @type {ItemModel[]}
   */
  @computed('model.items.@each.quantity')
  get noItemsAdded() {
    const items = this.model.items.filter(item => item.quantity > 0);
    return !items.length;
  }

}
