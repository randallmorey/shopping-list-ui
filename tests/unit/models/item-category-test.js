import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | item category', function(hooks) {
  setupTest(hooks);

  test('it validates', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('item', {});
    assert.notOk(model.validate());
    model.name = 'Tomster';
    assert.ok(model.validate());
  });
});
