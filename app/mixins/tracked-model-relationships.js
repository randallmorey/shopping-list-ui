import Mixin from '@ember/object/mixin';
import { computed, defineProperty, get } from '@ember/object';
import { not } from '@ember/object/computed';
import { on } from '@ember/object/evented';

/**
 * Adds a computed property `hasDirtyRelationships` that returns `true` if any
 * tracked belongsTo relationship has changed, or `false` otherwise.
 * Adds unique computed properties for each tracked relationship
 * (e.g. `categoryIsDirty`).  Adds methods for rolling back all relationships
 * or individual relationships.
 *
 * Apple this mixin to a model and mark relationships that should be tracked:
 * @example
 *    @belongsTo('item-category', {trackChanges: true}) category;
 *
 * Check if any relationships are dirty:
 * @example
 *    if (record.hasDirtyRelationships) { … }
 *
 * Check if a single relationship is dirty:
 * @example
 *    if (record.categoryIsDirty) { … }
 *
 * Rollback all relationships:
 * @example
 *    record.rollbackRelationships();
 *
 * Rollback a single relationship:
 * @example
 *    record.rollbackBelongsTo('category');
 *
 * @class TrackedModelRelationshipsMixin
 * @augments Mixin
 *
 * @property hasDirtyRelationships {Boolean}
 */
export default Mixin.create({ // eslint-disable-line ember/no-new-mixins

  // =properties

  /**
   * A list of all tracked belongsTo relationships by name.
   * @memberOf TrackedModelRelationshipsMixin
   * @type {String[]}
   */
  trackedBelongsToNames: computed('constructor.relationships.[]', function () {
    const names = [];
    this.constructor.relationships.forEach(([relationshipDefinition]) => {
      /* istanbul ignore else  */
      if (relationshipDefinition.options.trackChanges &&
          relationshipDefinition.kind === 'belongsTo') {
        names.push(relationshipDefinition.name);
      }
    });
    return names;
  }),

  /**
   * True if record has any dirty attributes or relationships.
   * @type {Boolean}
   */
  isDirty: computed('hasDirtyAttributes', 'hasDirtyRelationships', function () {
    return this.hasDirtyAttributes || this.hasDirtyRelationships;
  }),

  /**
   * True if record has is not dirty.
   * @type {Boolean}
   */
  isClean: not('isDirty'),

  // =methods

  /**
   * Initializes `hasDirtyRelationships` computed property that evaluates to
   * `true` if any tracked relationships are dirty.
   * @memberOf TrackedModelRelationshipsMixin
   * @function
   * @param {String[]} names
   */
  initializeHasDirtyRelationshipsProperty: on('init', function () {
    const dependentKeys = this.trackedBelongsToNames
      .map(name => `${name}IsDirty`);
    const computedProperty = computed(...dependentKeys, function () {
      const propertyValues = dependentKeys.map(name => this.get(name));
      return propertyValues.some(value => value);
    });
    defineProperty(this, 'hasDirtyRelationships', computedProperty);
  }),

  /**
   * Initializes a computed property that evaluates to `true` if the named
   * relationship is dirty.
   * @memberOf TrackedModelRelationshipsMixin
   * @function
   * @param {String} name
   */
  initializeIsDirtyBelongsToProperty: on('init', function () {
    this.trackedBelongsToNames.forEach(name => {
      const computedProperty = computed(`${name}.id`, `isSaving`, function () {
        return this.isDirtyBelongsTo(name);
      });
      defineProperty(this, `${name}IsDirty`, computedProperty);
    });
  }),

  /**
   * Checks the named relationship and returns `true` if dirty.
   * @memberOf TrackedModelRelationshipsMixin
   * @function
   * @param {String} name
   * @returns {Boolean}
   */
  isDirtyBelongsTo(name) {
    const canonicalId =
      get(this.belongsTo(name), 'belongsToRelationship.canonicalState.id');
    const currentId = this.get(`${name}.id`);
    return canonicalId != currentId;
  },

  /**
   * Convenience to rollback attributes and relationships in one go.
   */
  rollback() {
    this.rollbackAttributes();
    this.rollbackRelationships();
  },

  /**
   * Rolls back all dirty tracked relationships.
   * @memberOf TrackedModelRelationshipsMixin
   * @function
   */
  rollbackRelationships() {
    this.trackedBelongsToNames.forEach(name => this.rollbackBelongsTo(name));
  },

  /**
   * Rolls back a single named belongsTo relationship.
   * @memberOf TrackedModelRelationshipsMixin
   * @function
   * @param {String} name
   */
  rollbackBelongsTo(name) {
    const relationship = this.belongsTo(name);
    /* istanbul ignore else  */
    if (this.isDirtyBelongsTo(name)) {
      const modelName = get(relationship, 'type');
      const id = get(relationship, 'belongsToRelationship.canonicalState.id');
      if (id) {
        const record = this.store.peekRecord(modelName, id);
        this.set(name, record);
      } else {
        this.set(name, null);
      }
    }
  }
});
