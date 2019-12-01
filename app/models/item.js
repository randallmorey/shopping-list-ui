import Model from '@ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Validator from '../mixins/object-validator';

/**
 * A simple model representing the universe of available shopping items.
 * Items are really only useful after being added to shopping lists.
 *
 * @class ItemModel
 * @augments Model
 *
 * @property name {String}
 * @property category {ItemCategoryModel}
 */
export default class ItemModel extends Model.extend(Validator) {

  // =attributes

  @attr('string') name;

  // =relationships

  @belongsTo('item-category') category;

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });

}
