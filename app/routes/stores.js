import Route from '@ember/routing/route';
import RealtimeRouteMixin from '../mixins/realtime-route';
import { inject as service } from '@ember/service';

/**
 * A route to load and display all stores.
 * @class StoresRoute
 * @augments Route
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
     return this.store.findAll('store')
   }

   /**
    * Subscribe to realtime updates on items.
    * @param {Object} model
    */
   afterModel(model) {
     this.subscribe(model.stores);
     return super.afterModel(...arguments);
   }

   /**
    * Activate the sidebar, as this pane is dominant for this route.
    */
   render() {
     super.render(...arguments);
     super.render('stores/-sidebar', {
       outlet: 'sidebar',
       into: 'stores'
     });
   }
 }
