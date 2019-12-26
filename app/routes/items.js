import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { hash } from 'rsvp';
import RealtimeRouteMixin from '../mixins/realtime-route';

/**
 * A route to load and display all items.
 * @class ItemsRoute
 * @augments Route
 */
export default class ItemsRoute extends Route.extend(RealtimeRouteMixin) {

  // =services

  @service activePane;
  @service confirmations;

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

  /**
   * If dirty, valid, and not already saving, save the record.
   * If save is successful, redirect to items.
   * @param {Model} record
   */
  @action
  async submit(record) {
    // Only do save if the model has changes that are valid.
    const canSave =
      record.isDirty &&
      record.validate() &&
      !record.isSaving;

    /* istanbul ignore else  */
    if (canSave) {
      await record.save();
      this.transitionTo('items');
    }
  }

  /**
   * Clear errors, rollback attributes and relationships,
   * and redirect to items route.  Redirect to items.
   * @param {Model} record
   */
  @action
  cancel(record) {
    record.errors.clear();
    record.rollback();
    this.transitionTo('items');
  }

  /**
   * Requests delete confirmation from user.  If confirmed, destroys
   * record and redirects to items.
   * @param {Model} record
   */
  @action
  delete(record) {
    /* istanbul ignore else  */
    if (!this.deleteConfirmation) {
      this.deleteConfirmation = this.confirmations.getConfirmation('delete');
      this.deleteConfirmation
        .then(() => record.destroyRecord())
        .then(() => this.transitionTo('items'))
        .finally(() => delete this.deleteConfirmation);
    }
  }

}
