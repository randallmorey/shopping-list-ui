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

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });

}
