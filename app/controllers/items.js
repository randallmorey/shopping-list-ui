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
   * 
   */
  @computed('model.@each.category')
  get groupedItems() {
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
    const groupArray = Object.keys(groupObject).map(key => groupObject[key]);
    return groupArray;
  }
}
