import Model from '@ember-data/model';
import attr from 'ember-data/attr';
import Validator from '../mixins/object-validator';
import TrackedModelRelationshipsMixin from
  '../mixins/tracked-model-relationships';

/**
 * A convenience base model that extends common mixins (validator, tracked
 * relationships), and provides auto-date fields `dateCreated`
 * and `dateUpdated`.
 */
export default class ModelModel extends Model.extend(
  Validator,
  TrackedModelRelationshipsMixin) {

  // =attributes

  @attr('date') dateCreated;
  @attr('date') dateUpdated;

  // =methods

  /**
   * Updates `dateUpdated` on every save and adds `dateCreated` on first save.
   * Deleted models are not updated.
   */
  setAutoDateFields() {
    const now = new Date();
    if (this.isNew && !this.isDeleted) this.setProperties({dateCreated: now});
    if (!this.isDeleted) this.setProperties({dateUpdated: now});
  }

  /**
   * Set autodate fields, save the record, then conditionally reload to
   * support firebase.
   */
  save() {
    this.setAutoDateFields();
    return super.save(...arguments)
      .then(record => {
        // This is a hack to make firebase fully normalize a record, which
        // it doesn't do for all request types, but will do for GET.
        if (!record.isDeleted) {
          return record.reload();
        } else {
          return record;
        }
      });
  }
}
