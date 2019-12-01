import FirestoreAdapter from 'emberfire/adapters/firestore';

/**
 * @class ApplicationAdapter
 * @augments FirestoreAdapter
 */
export default class ApplicationAdapter extends FirestoreAdapter {

  // =properties

  /**
   * @memberof ApplicationAdapter
   * @type {Boolean}
   */
  enablePersistence = true;

  /**
   * @memberof ApplicationAdapter
   * @type {Object}
   */
  persistenceSettings = Object.freeze({ synchronizeTabs: true });
}
