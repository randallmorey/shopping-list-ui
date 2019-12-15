import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

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
    return this.store.findAll('item');
  }

  /**
   * Activate the sidebar, as this pane is dominant for this route.
   */
  render() {
    this.activePane.activateSidebar();
    super.render(...arguments);
  }

}
