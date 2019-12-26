import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../mixins/persitence-route-mixin';

/**
 * A route to load and display a single item.
 */
export default class ItemsItemRoute extends Route.extend(PersitenceRouteMixin) {
  // =methods

  /**
   * Returns an item by ID.
   * @returns {ItemModel}
   */
  model(params) {
    return this.store.findRecord('item', params.item_id);
  }
}
