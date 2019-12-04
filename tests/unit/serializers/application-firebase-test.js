import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | application firebase', function(hooks) {
  setupTest(hooks);

  test('it serializes records', function(assert) {
    assert.expect(1);
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('item', {});
    let serializedRecord = record.serialize();
    assert.ok(serializedRecord);
  });

  test('it applies transforms on create', function(assert) {
    assert.expect(1);
    let serializer = this.owner.lookup('serializer:application-firebase');
    let store = this.owner.lookup('service:store');
    let primaryModelClass = store.createRecord('item').constructor;
    const payload = {
      data: {
        dateCreated: '2019-11-19T00:00:00.000Z'
      }
    };
    const id = '1';
    const normalized = serializer
      .normalizeCreateRecordResponse(store, primaryModelClass, payload, id);
    assert.equal(normalized.data.attributes.dateCreated.constructor, Date,
      'dateCreated was normalized to a Date object');
  });
});
