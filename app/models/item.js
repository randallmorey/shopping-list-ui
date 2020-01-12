import Model from './model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { htmlSafe } from '@ember/template';

/**
 * A simple model representing the universe of available shopping items.
 * Items are really only useful after being added to shopping lists.
 *
 * @property name {String}
 * @property category {ItemCategoryModel}
 */
export default class ItemModel extends Model {

  // =attributes

  @attr('string') name;
  @attr('boolean', {defaultValue: false}) purchased;
  @attr('number', {defaultValue: 0}) quantity;
  @attr('string') notes;

  // =relationships

  @belongsTo('item-category', {trackChanges: true}) category;

  // =computed

  /**
   * Equal to the value of name or, if no name, an HTML-safe ellipsis.
   * @return {String}
   */
  get displayName() {
    return this.name ? this.name : htmlSafe('&hellip;');
  }

  // =methods

  /**
   * Increases quantity by 1.
   */
  incrementQuantity() {
    this.incrementProperty('quantity');
  }

  /**
   * Decreases quantity by 1.
   */
  decrementQuantity() {
    this.decrementProperty('quantity');
  }

  // =validations

  validations = Object.freeze({
    name: { presence: true },
    quantity: {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0
      }
    }
  });

}
