import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

/**
 * Exposes the active pane service to the context.
 */
export default class ItemsController extends Controller {

  // = services

  @service activePane;

  // =properties

  /**
   * Array of category items groups.
   * @type {{category: Object, items: Array}[]}
   */
  @computed('model.@each.category')
  get groupedItems() {
    // Group items into category objects, with fields category and items.
    const groupObject = this.model.reduce((accumulator, currentValue) => {
      const categoryId = currentValue.get('category.id');
      if (accumulator[categoryId]) {
        accumulator[categoryId].items.push(currentValue);
      } else {
        accumulator[categoryId] = {
          category: currentValue.get('category'),
          items: [currentValue]
        };
      }
      return accumulator;
    }, {});
    // Transform object into an array of category objects, since these
    // are easier to work with.
    const groupArray = Object.keys(groupObject).map(key => groupObject[key]);
    return groupArray;
  }
}
