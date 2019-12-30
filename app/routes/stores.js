import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import RealtimeRouteMixin from '../mixins/realtime-route';

/**
 * A route to load and display all stores.
 * @augments Route
 * @augments RealtimeRouteMixin
 */
export default class StoresRoute extends Route.extend(RealtimeRouteMixin) {

  // =services

  @service activePane;

  // =methods

  /**
   * Returns all stores.
   * @returns {StoreModel[]}
   */
   model() {
     return this.store.findAll('store');
   }

   /**
    * Subscribe to realtime updates on stores.
    * @param {Object} model
    */
   afterModel(model) {
     this.subscribe(model);
     return super.afterModel(...arguments);
   }

   /**
    * Render the sidebar in addition to the main template.
    */
   render() {
     super.render(...arguments);
     super.render('stores/-sidebar', {
       outlet: 'sidebar',
       into: 'stores'
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
