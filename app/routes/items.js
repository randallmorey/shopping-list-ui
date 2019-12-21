import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { hash } from 'rsvp';

/**
 * A route to load and display all items.
 * @class ItemsRoute
 * @augments Route
 */
export default class ItemsRoute extends Route {

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
