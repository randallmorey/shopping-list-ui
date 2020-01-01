import Model from './model';
import { hasMany } from 'ember-data/relationships';

/**
 * A simple model representing a shopping list.
 *
 * @property items {ShoppingListItemModel[]}
 */
export default class ShoppingListModel extends Model {

  // =relationships

  @hasMany('shopping-list-item') items;

}
