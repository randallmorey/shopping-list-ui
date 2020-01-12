import Model from './model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { htmlSafe } from '@ember/template';

/**
 * A simple model representing the universe of available stores.
 *
 * @property name {String}
 * @property location {String}
 */
export default class StoreModel extends Model {
  // =attributes

  @attr('string') name;
  @attr('string') location;

  // =relationships
  @hasMany('store-item-category') categories;

  // =computed

  /**
   * Store categories sorted by their `order` field.
   * @type {StoreItemCategory[]}
   */
  get categoriesByOrder() {
    return this.categories.sortBy('order');
  }

  /**
   * True if any category is currently saving.
   * @type {Boolean}
   */
  get categoriesSaving() {
    return this.categories.reduce(
      (accumulator, currentValue) => currentValue.isSaving || accumulator,
      false
    );
  }

  /**
   * Equal to the value of name or, if no name, an HTML-safe ellipsis.
   * @type {String}
   */
  get displayName() {
    return this.name ? this.name : htmlSafe('&hellip;');
  }

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });
}
