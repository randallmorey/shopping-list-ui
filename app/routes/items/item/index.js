import Route from '@ember/routing/route';

/**
 * Handles item persistence and post-persistence actions.
 */
export default class ItemsItemIndexRoute extends Route {

  // =methods

  /**
   * Inserts categories into the context as `categories`.
   * @param {Controller} controller
   */
  setupController(controller) {
    super.setupController(...arguments);
    controller.set('categories', this.modelFor('items').categories);
  }

}
