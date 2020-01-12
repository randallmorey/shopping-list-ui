import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | item category', function(hooks) {
  setupTest(hooks);

  test('it validates', function(assert) {
    assert.expect(2);
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('item-category', {});
    assert.notOk(model.validate());
    model.name = 'Hamster';
    assert.ok(model.validate());
  });

  test('it has a displayName property that is ellipsis if name is empty', function(assert) {
    assert.expect(2);
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('item-category', {name: 'Test'});
    assert.equal(model.displayName, 'Test');
    model.name = '';
    assert.equal(model.displayName, '&hellip;');
  });
});
