import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | items/item', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:items/item');
    assert.ok(route);
  });

  test('it\'s cancel action cleans the record and redirects', function(assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('item', {});
    const route = this.owner.lookup('route:items/item');
    assert.expect(3);
    route.currentModel = model;
    route.transitionTo = routeName => assert.equal(routeName, 'items');
    assert.ok(model.isDirty);
    route.cancel();
    assert.ok(model.isClean);
  });
});
