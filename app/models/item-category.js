import Model from '@ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Validator from '../mixins/object-validator';

/**
 * An item category.
 *
 * @class ItemModel
 * @augments Model
 *
 * @property name {String}
 * @property items {ItemModel[]}
 */
export default class ItemCategoryModel extends Model.extend(Validator) {

    // =attributes

    @attr('string') name;

    // =relationships

    @hasMany('item') items;

    // =validations

    validations = Object.freeze({
      name: { presence: true }
    });

}
