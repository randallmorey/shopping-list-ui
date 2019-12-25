import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { hash } from 'rsvp';
import RealtimeRouteMixin from '../mixins/realtime-route';

/**
 * A route to load and display all items.
 * @class ItemsRoute
 * @augments Route
 */
export default class ItemsRoute extends Route.extend(RealtimeRouteMixin) {

  // =services

  @service activePane;

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
   * Subscribe to realtime updates on items.
   */
  afterModel(model) {
    this.subscribe(model.items);
    return super.afterModel(...arguments);
  }

  /**
   * Activate the sidebar, as this pane is dominant for this route.
   */
  render() {
    super.render(...arguments);
    super.render('items/-sidebar', {
      outlet: 'sidebar',
      into: 'items'
    });
  }

  // =actions

  /**
   * Activates the sidebar pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateSidebar();
  }

}
