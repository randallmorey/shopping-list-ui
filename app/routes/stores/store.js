import Route from '@ember/routing/route';
import PersitenceRouteMixin from '../../mixins/persitence-route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { all } from 'rsvp';
/**
 * A route to edit a store by ID and handle update and delete persistence.
 * @augments Route
 * @augments PersitenceRouteMixin
 */
export default class StoresStoreRoute extends Route.extend(
  PersitenceRouteMixin
) {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns a store by ID.
   * @returns {StoreModel}
   */
  model(params) {
    return this.store.findRecord('store', params.store_id);
  }

  /**
   * Preload all item categories as well as this store's store item categories.
   * Sets loading state on the model and clears it when loading completes.
   * @param {StoreModel} model
   */
  async afterModel(model) {
    this.setLoading(model);
    await model.get('categories').reload();
    const itemCategories = await this.store.findAll('item-category');
    this.setProperties({itemCategories});
    await this.reconcileCategories(model, this.itemCategories);
    this.clearLoading(model);
  }

  /**
   * Compares and reconciles list of store item categories with item categories.
   *
   * 1)  Removes any store item categories without associated item categories.
   * 2)  For every item category without an associated store item category,
   *     creates a store item category.  Ensures created records have ascending
   *     `order` values.
   *
   * @param {StoreModel} model
   * @param {ItemCategoryModel[]} itemCategories
   */
  async reconcileCategories(model, itemCategories) {
    let storeItemCategories = model.get('categories');
    // Destroy any store item categories without associated item categories.
    await all(storeItemCategories.map(storeItemCategory => {
      if (!storeItemCategory.get('itemCategory.id'))
        return storeItemCategory.destroyRecord();
    }));
    // Find the highest order value among store item categories.
    const highestOrder = storeItemCategories.length ?
      Math.max(...storeItemCategories.map(sic => sic.order || 0)) : 0;
    // current order
    let order = highestOrder + 1;
    // Find any item categories without associated store item categories
    const absentItemCategories = itemCategories
      .filter(({id}) => !storeItemCategories.findBy('itemCategory.id', id));
    // Create missing store item categories
    return all(absentItemCategories.map(itemCategory => {
      storeItemCategories.createRecord({itemCategory, order: order++}).save();
    }));
  }

  /**
   * Inserts item categories into the context as `itemCategories`.
   * @param {Controller} controller
   */
  setupController(controller) {
    super.setupController(...arguments);
    controller.set('itemCategories', this.itemCategories);
  }

  /**
   * This is a potentially slow-loading route, so we want to indicate this to
   * the user somehow.  This scheme sets a transient property on the store
   * model, which is picked up by the stores index route.
   * @param {StoreModel} model
   */
  setLoading(model) {
    model.set('loadingStoreRoute', true);
  }

  /**
   * Sets the loading indicator to false.
   * @param {StoreModel} model
   */
  clearLoading(model) {
    model.set('loadingStoreRoute', false);
  }

  /**
   * Redirect to stores route.
   */
  afterPersistence() {
    this.transitionTo('stores');
  }

  /**
   * Redirect to stores route.
   */
  afterCancel() {
    this.transitionTo('stores');
  }

  /**
   * Change the store item category by the specified number of places,
   * update `order` across store item categories, and save all.
   * @param {StoreItemCategoryModel} category
   * @param {Number} places number of places by which to move category
   */
  changeCategoryOrderBy(category, places=1) {
    // Create a quick-and-dirty copy of the categories array that we can mutate
    const categories = this.currentModel.categoriesByOrder.map(c => c);
    // Get the current and next indices
    const currentIndex = categories.indexOf(category);
    const nextIndex = currentIndex + places;
    console.log(currentIndex, nextIndex);
    console.log(categories[currentIndex].get('itemCategory.name'),
      categories[nextIndex].get('itemCategory.name'));
    // Swap the items
    categories[currentIndex] = categories[nextIndex];
    categories[nextIndex] = category;
    // Reassign order values and save
    categories.map((c, i) => {
      c.order = i;
      c.save();
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
   * Move the store item category down one spot, update `order` across store
   * item categories, and save all.
   * @param {StoreItemCategoryModel} category
   */
  @action
  decreaseCategoryOrder(category) {
    this.changeCategoryOrderBy(category, -1);
  }

  /**
   * Move the store item category up one spot, update `order` across store
   * item categories, and save all.
   * @param {StoreItemCategoryModel} category
   */
  @action
  increaseCategoryOrder(category) {
    this.changeCategoryOrderBy(category, 1);
  }

}
