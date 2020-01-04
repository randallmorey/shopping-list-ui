import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { all, hash } from 'rsvp';
import RealtimeRouteMixin from '../../../mixins/realtime-route';

/**
 * A route to load and display all shopping list items for the current list.
 * @augments Route
 * @augments RealtimeRouteMixin
 */
export default class ShoppingListsShoppingListShoppingListItemsRoute extends
  Route.extend(RealtimeRouteMixin) {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns all items, categories, and shopping list items.
   * @returns {Object}
   */
  model() {
    return hash({
      items: this.store.findAll('item'),
      categories: this.store.findAll('item-category'),
      shoppingListItems:
        this.modelFor('shopping-lists.shopping-list').get('items')
    })
  }

  /**
   * Performs some initial setup tasks:
   * 1) For every item without an inverse shopping list item,
   *    creates a list item.
   * 2) For every shopping list item without an inverse item, deletes the
   *    shopping list item.
   * 2) Subscribes to realtime updates on shopping list items.
   * @param {Object} model
   */
  afterModel(model) {
    const list = this.modelFor('shopping-lists.shopping-list');
    // Find items without inverse shopping list items
    const futureListItems = model.items
      .filter(({id}) => !model.shoppingListItems.findBy('id', id));
    // Find shopping list items without inverse items
    const orphanedListItems = model.shoppingListItems
      .filter(shoppingListItem => !shoppingListItem.get('item.id'));
    return hash({
      // Create new shopping list items
      newShoppingListItems: all(futureListItems.map(item =>
        this.store.createRecord('shopping-list-item', {list, item}).save()
      )),
      // Delete any shopping list items without an inverse item
      deletedShoppingListItems:
        all(orphanedListItems.map(sli => sli.destroyRecord()))
    })
    // Subscribe to realtime updates on shopping list items
    .then(() => this.subscribe(model.shoppingListItems));
  }

  /**
   * Render the sidebar in addition to the main template.
   */
  render() {
    super.render(...arguments);
    super.render('shopping-lists/shopping-list/shopping-list-items/-sidebar', {
      outlet: 'sidebar',
      into: 'shopping-lists/shopping-list/shopping-list-items'
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
