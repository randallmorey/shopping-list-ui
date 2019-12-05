import Model from '@ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Validator from '../mixins/object-validator';
import DatedModelAttributesMixin from '../mixins/dated-model-attributes';
import DatedModelMethodsMixin from '../mixins/dated-model-attributes';
import TrackedModelRelationshipsMixin from
  '../mixins/tracked-model-relationships';

/**
 * A simple model representing the universe of available shopping items.
 * Items are really only useful after being added to shopping lists.
 *
 * @class ItemModel
 * @augments Model
 * @augments Validator
 * @augments DatedModelAttributesMixin
 * @augments DatedModelMethodsMixin
 * @augments TrackedModelRelationshipsMixin
 *
 * @property name {String}
 * @property category {ItemCategoryModel}
 */
export default class ItemModel extends Model.extend(
  Validator,
  DatedModelAttributesMixin,
  DatedModelMethodsMixin,
  TrackedModelRelationshipsMixin) {

  // =attributes

  @attr('string') name;

  // =relationships

  @belongsTo('item-category', {trackChanges: true}) category;

  // =validations

  validations = Object.freeze({
    name: { presence: true }
  });

}
