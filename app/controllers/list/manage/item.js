import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ListManageItemController extends Controller {

  // =actions

  /**
   * Decreases quantity.
   */
  @action
  decrementQuantity() {
    this.model.decrementQuantity();
  }

  /**
   * Increases quantity.
   */
  @action
  incrementQuantity() {
    this.model.incrementQuantity();
  }

}
