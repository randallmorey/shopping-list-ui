import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../../mixins/persitence-route';

/**
 * A route to handle item category update and delete persistence.
 * @augments Route
 * @augments PersitenceRouteMixin
 */
export default class ItemsItemCategoriesRoute extends Route.extend(
  PersitenceRouteMixin
) {

  // =methods

  /**
   * Redirect to items route, replacing the history item.  We do not want
   * the back button to reach the now-stale new route.
   */
  afterPersistence() {
    this.replaceWith('items.item');
  }

  /**
   * Redirect to items route.
   */
  afterCancel() {
    this.transitionTo('items.item');
  }

}
