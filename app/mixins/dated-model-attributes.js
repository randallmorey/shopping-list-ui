import Mixin from '@ember/object/mixin';
import attr from 'ember-data/attr';

/**
 * Adds model attributes for `dateCreated` and `dateUpdated`.
 *
 * @class DatedModelAttributesMixin
 * @augments Mixin
 *
 * @property dateCreated {Date}
 * @property dateUpdated {Date}
 */
export default Mixin.create({ // eslint-disable-line ember/no-new-mixins

  // =attributes

  dateCreated: attr('date'),
  dateUpdated: attr('date')

});
