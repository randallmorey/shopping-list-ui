import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | application', function(hooks) {
  setupTest(hooks);

  test('it serializes records', function(assert) {
    assert.expect(1);
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('item', {});
    let serializedRecord = record.serialize();
    assert.ok(serializedRecord);
  });
});
