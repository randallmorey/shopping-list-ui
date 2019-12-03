import Mixin from '@ember/object/mixin';

/**
 * Auto-updates fields `dateCreated` and `dateUpdated`.
 *
 * @class DatedModelMethodsMixin
 * @augments Mixin
 */
export default Mixin.create({ // eslint-disable-line ember/no-new-mixins

  // =methods

  /**
   * Updates `dateUpdated` on every save and adds `dateCreated` on first save.
   * Deleted models are not updated.
   *
   * @memberof DatedModelMixin
   * @function
   */
  save() {
    const now = new Date();
    if (this.isNew && !this.isDeleted) this.setProperties({dateCreated: now});
    if (!this.isDeleted) this.setProperties({dateUpdated: now});
    return this._super(...arguments);
  }

});
