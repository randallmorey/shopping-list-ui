import Model from '@ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Validator from '../mixins/object-validator';
import DatedModelAttributesMixin from '../mixins/dated-model-attributes';
import DatedModelMethodsMixin from '../mixins/dated-model-attributes';

/**
 * An item category.
 *
 * @class ItemModel
 * @augments Model
 * @augments Validator
 * @augments DatedModelAttributesMixin
 * @augments DatedModelMethodsMixin
 *
 * @property name {String}
 * @property items {ItemModel[]}
 */
export default class ItemCategoryModel extends Model.extend(
  Validator,
  DatedModelAttributesMixin,
  DatedModelMethodsMixin) {

  // =attributes

  @attr('string') name;

  // =relationships

  @hasMany('item') items;

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });

}
