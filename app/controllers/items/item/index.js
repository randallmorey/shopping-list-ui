import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ItemsItemIndexController extends Controller {

  // = actions

  /**
   * Assigns the category to the controller's model.
   * @param {ItemCategoryModel} category
   */
  @action
  categoryChange(category) {
    this.model.set('category', category);
  }

}
