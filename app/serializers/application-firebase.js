/* istanbul ignore file */
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
    // Relationship normalization is missing from the official version
    // of this method.  So relationships remain in a dirty state after create.
    const { relationships, included } =
      normalizeRelationships(store, primaryModelClass, payload.data);
    const data = { id, type, attributes, relationships };
    const normalized = { data, included };
    // Attribute transformations are not applied on create in the official
    // version of this method.
    this.applyTransforms(primaryModelClass, normalized.data.attributes);
    return normalized;
  }
}

const normalizeRelationships = (store, modelClass, attributes) => {
    const relationships = {};
    const included = [];
    modelClass.eachRelationship((key, relationship) => {
        const attribute = attributes[key];
        delete attributes[key];
        relationships[key] = normalizeRealtionship(relationship)(store, attribute, relationship, included);
    }, null);
    return { relationships, included };
};
const normalizeRealtionship = (relationship) => {
    if (relationship.kind === 'belongsTo') {
        return normalizeBelongsTo;
    }
    else if (relationship.options.embedded) {
        return normalizeEmbedded;
    }
    else {
        return normalizeHasMany;
    }
};
const normalizeBelongsTo = (_store, attribute, relationship, _included) => {
    if (attribute) {
        return { data: { id: attribute, type: relationship.type } };
    }
    else {
        return {};
    }
};
const normalizeHasMany = (_store, _attribute, _relationship, _included) => ({ links: { related: 'emberfire' } });
