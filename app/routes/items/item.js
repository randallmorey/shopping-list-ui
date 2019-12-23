import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { hash } from 'rsvp';

/**
 * A route to load and display a single item.
 */
export default class ItemsItemRoute extends Route {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns an item by ID.
   * @returns {ItemModel}
   */
  model(params) {
    return hash({
      item: this.store.findRecord('item', params.item_id),
      categories: this.modelFor('items').categories
    });
  }

  // =actions

  /**
   * Activates the body pane as dominant for this route.
   */
  @action
  didTransition() {
    this.activePane.activateBody();
  }

  /**
   * If dirty and valid, save the record.
   */
  @action
  submit() {
    // Only do save if the model has changes that are valid.
    if (this.currentModel.isDirty && this.currentModel.validate()) {
      // TODO
      console.log('submit');
    }
  }

  /**
   * Rollback attributes and relationships and redirect to items route.
   */
  @action
  cancel() {
    this.currentModel.rollbackAttributes();
    this.currentModel.rollbackRelationships();
    this.transitionTo('items');
  }
}
