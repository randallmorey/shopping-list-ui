import Model from './model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

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
  @belongsTo('item-category', {trackChanges: true}) itemCategory;

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });
}
