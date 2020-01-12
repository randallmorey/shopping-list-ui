import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { all } from 'rsvp';

export default class ListManageRoute extends Route {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns all items.
   * @returns {ItemModel[]}
   */
  model() {
    return this.modelFor('list');
  }

  /**
   * Render the sidebar in addition to the main template.
   */
  render() {
    super.render(...arguments);
    super.render('list/manage/-sidebar', {
      outlet: 'sidebar',
      into: 'list/manage'
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

  /**
   * Resets all item quantities to 0, saves, and redirects to index.
   */
  @action
  async clear() {
    await all(
      this.currentModel.items
        .filter(item => (item.quantity > 0) || item.purchased)
        .map(item => {
          item.purchased = false;
          item.quantity = 0;
          return item.save();
        })
    );
    this.transitionTo('index');
  }

}
