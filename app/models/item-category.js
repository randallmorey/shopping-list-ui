import Model from './model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

/**
 * An item category.
 *
 * @property name {String}
 * @property items {ItemModel[]}
 */
export default class ItemCategoryModel extends Model {

  // =attributes

  @attr('string') name;

  // =relationships

  @hasMany('item') items;

  // =computed

  /**
   * Equal to the value of name or, if no name, an HTML-safe ellipsis.
   * @return {String}
   */
  @computed('name')
  get displayName() {
    return this.name ? this.name : htmlSafe('&hellip;');
  }

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });

}
