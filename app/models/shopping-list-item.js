import Model from './model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

/**
 * A simple model representing a shopping list item.
 *
 * @property purchased {Boolean}
 * @property quantity {Number}
 * @property notes {String}
 * @property item {ShoppingListModel}
 */
export default class ShoppingListItemModel extends Model {

  // =attributes

  @attr('boolean', {defaultValue: false}) purchased;
  @attr('number', {defaultValue: 0}) quantity;
  @attr('string') notes;

  // =relationships

  @belongsTo('item') item;
  @belongsTo('shopping-list') list;

  // =computed

  /**
   * @type {String}
   */
  get name() {
    return this.get('item.name');
  }

  /**
   * @type {ItemCategoryModel}
   */
  get category() {
    return this.get('item.category');
  }

  // =validations

  validations = Object.freeze({
    quantity: {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0
      }
    }
  });

}
