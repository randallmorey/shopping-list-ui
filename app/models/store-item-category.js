import Model from './model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { htmlSafe } from '@ember/template';

/**
 * A store item category.
 *
 * @property order {Number}
 */
export default class StoreItemCategoryModel extends Model {
  // =attributes
  @attr('number') order;

  // =relationships
  @belongsTo('store', {trackChanges: true}) storeProperty;
  @belongsTo('item-category', {trackChanges: true}) storeItemCategory;

  // =computed

  /**
   * Equal to the value of name or, if no name, an HTML-safe ellipsis.
   * @return {String}
   */
  get displayName() {
    return this.name ? this.name : htmlSafe('&hellip;');
  }

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });
}
