import FirestoreSerializer from 'emberfire/serializers/firestore';

/**
 * @class ApplicationFirebaseSerializer
 * @augments FirestoreSerializer
 */
export default class ApplicationFirebaseSerializer extends FirestoreSerializer {

  // =methods

  /**
   * This method patches the lack of transform support when a record is created
   * with `FirestoreSerializer`.  If response data is not transformed after
   * receiving a response, it can become corrupted on further saves.  This is
   * most apparent with date fields which if left untransformed are stored as
   * strings rather than `Date` objects.
   *
   * This applies only to create.  All other response types appear to apply
   * transforms correctly.
   *
   * @memberof ApplicationFirebaseSerializer
   * @function
   * @param {Object} store
   * @param {Object} primaryModelClass
   * @param {Object} payload
   * @param {String} id
   */
  normalizeCreateRecordResponse(store, primaryModelClass, payload, id) {
    const type = primaryModelClass.modelName;
    const attributes = Object.assign({}, payload.data);
    const data = { id, type, attributes };
    const normalized = { data };
    // This is the critical call that is missing in `FirestoreSerializer`.
    this.applyTransforms(primaryModelClass, normalized.data.attributes);
    return normalized;
  }
}
