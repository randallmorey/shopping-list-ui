import Model from './model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

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

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });

}
