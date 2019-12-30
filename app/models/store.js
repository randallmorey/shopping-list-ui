import Model from '@ember-data/model';
import attr from 'ember-data/attr';
import { htmlSafe } from '@ember/template';

/**
 * A simple model representing the universe of available stores.
 *
 * @property name {String}
 * @property location {String}
 */
export default class StoreModel extends Model {
  // =attributes

  @attr('string') name;
  @attr('string') location;

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
