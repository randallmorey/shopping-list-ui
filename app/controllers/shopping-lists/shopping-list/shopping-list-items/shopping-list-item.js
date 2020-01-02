import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ShoppingListsShoppingListShoppingListItemsShoppingListItemController
extends Controller {

  // =actions

  @action
  decrement() {
    this.model.decrementProperty('quantity');
  }

  @action
  increment() {
    this.model.incrementProperty('quantity');
  }

}
