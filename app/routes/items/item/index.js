import Route from '@ember/routing/route';

export default class ItemsItemIndexRoute extends Route {

  setupController(controller) {
    super.setupController(...arguments);
    controller.categories = this.modelFor('items').categories;
  }

}
