import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../mixins/persitence-route-mixin';

export default class ItemsNewRoute extends Route.extend(PersitenceRouteMixin) {
  // =methods

  /**
   * Returns an item by ID.
   * @returns {ItemModel}
   */
  model() {
    return this.store.createRecord('item')
  }
}
