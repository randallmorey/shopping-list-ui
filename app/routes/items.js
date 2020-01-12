import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { hash } from 'rsvp';
import RealtimeRouteMixin from '../mixins/realtime-route';

/**
 * A route to load and display all items.
 * @augments Route
 * @augments RealtimeRouteMixin
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
   * @param {Object} model
   */
  afterModel(model) {
    this.subscribe(model.items);
    return super.afterModel(...arguments);
  }

  /**
   * Render the sidebar in addition to the main template.
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
