import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | store', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('store', {});
    assert.ok(model);
  });

  test('it has a displayName property that is ellipsis if name is empty', function(assert) {
    assert.expect(2);
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('store', {name: 'Test'});
    assert.equal(model.displayName, 'Test');
    model.name = '';
    assert.equal(model.displayName, '&hellip;');
  });
});
