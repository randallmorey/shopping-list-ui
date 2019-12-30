import Route from '@ember/routing/route';

/**
 * Simple route to insert item categories into the context.
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
