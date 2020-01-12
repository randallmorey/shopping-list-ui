import Route from '@ember/routing/route';
import RealtimeRouteMixin from '../mixins/realtime-route';
import { hash } from 'rsvp';

/**
 * A route to load all items and categories.
 * @augments Route
 * @augments RealtimeRouteMixin
 */
export default class ListRoute extends Route.extend(RealtimeRouteMixin) {

  // =methods

  /**
   * Returns all items.
   * @returns {ItemModel[]}
   */
  model() {
    return hash({
      categories: this.store.findAll('item-category'),
      items: this.store.findAll('item')
    });
  }

  /**
   * Preloads categories and subscribes to realtime updates on items.
   * @param {Object} model
   */
  async afterModel(model) {
    this.subscribe(model.items);
    this.subscribe(model.categories);
    return super.afterModel(...arguments);
  }

}
