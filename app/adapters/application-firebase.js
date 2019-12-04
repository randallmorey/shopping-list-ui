import FirestoreAdapter from 'emberfire/adapters/firestore';

/**
 * @class ApplicationFirebaseAdapter
 * @augments FirestoreAdapter
 */
export default class ApplicationFirebaseAdapter extends FirestoreAdapter {

  // =properties

  /**
   * @memberof ApplicationFirebaseAdapter
   * @type {Boolean}
   */
  enablePersistence = true;

  /**
   * @memberof ApplicationFirebaseAdapter
   * @type {Object}
   */
  persistenceSettings = Object.freeze({ synchronizeTabs: true });
}
