import Model from '@ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

/**
 * An item category.
 *
 * @class ItemModel
 * @augments Model
 *
 * @property name {String}
 * @property items {ItemModel[]}
 */
export default class ItemCategoryModel extends Model {

    // =attributes

    @attr('string') name;

    // =relationships

    @hasMany('item') items;

}
