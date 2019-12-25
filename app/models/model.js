import Model from '@ember-data/model';
import ModelFirebase from './model-firebase';
import attr from 'ember-data/attr';
import Validator from '../mixins/object-validator';
import TrackedModelRelationshipsMixin from
  '../mixins/tracked-model-relationships';
import config from '../config/environment';

// This if statement is ignored by coverage, since only one base model can
// be used at a time.
/* istanbul ignore next  */
const BaseModel = config.useFirebase ?
  ModelFirebase :
  Model;

/**
 * A convenience base model that extends common mixins (validator, tracked
 * relationships), and provides auto-date fields `dateCreated`
 * and `dateUpdated`.
 */
export default class ModelModel extends BaseModel.extend(
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
    return super.save(...arguments);
  }
}
