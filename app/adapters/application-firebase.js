/* istanbul ignore file */
import FirestoreAdapter from 'emberfire/adapters/firestore';
import { rootCollection } from 'emberfire/adapters/firestore';

const noop = (ref) => ref;
const getDoc = (adapter, type, id) => docReference(adapter, type, id).then(doc => doc.get());
const getDocs = (query) => query.get();
const queryDocs = (referenceOrQuery, query) => getDocs((query || noop)(referenceOrQuery));

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

  // Override emberfire findHasMany because..
  // theirs uses the wrong relationship key names
  findHasMany(store, snapshot, url, relationship) {
    const adapter = store.adapterFor(relationship.type); // TODO fix types
    if (adapter !== this) {
      return adapter.findHasMany(store, snapshot, url, relationship);
    } else if (relationship.options.subcollection) {
        return docReference(this, relationship.parentModelName, snapshot.id).then(doc => queryDocs(doc.collection(collectionNameForType(relationship.type)), relationship.options.query));
    } else {
      return rootCollection(this, relationship.type).then(collection => queryDocs(collection.where(relationship.__inverseKey, '==', snapshot.id), relationship.options.query));
    }
  }
}
