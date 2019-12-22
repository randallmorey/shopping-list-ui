import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

/**
 * Exposes the active pane service to the context.
 */
export default class ItemsController extends Controller {

  // =services

  @service activePane;

  // =properties

  /**
   * Lists only items *without* categories.
   * @type {ItemModel[]}
   */
  @computed('model.items.@each.category')
  get uncategorized() {
    return this.model.items.filter(item => !item.get('category.content'));
  }

}
