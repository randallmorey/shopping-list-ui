import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { resolve } from 'rsvp';

module('Unit | Route | items/item/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:items/item/index');
    assert.ok(route);
  });

  test('it\'s submit action saves the record and redirects if dirty and valid and not saving', function(assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('item', {name: 'Test'});
    const route = this.owner.lookup('route:items/item/index');
    assert.expect(5);
    route.currentModel = model;
    route.transitionTo = routeName => assert.equal(routeName, 'items');
    model.save = () => {
      assert.ok(true, 'model.save was called');
      return resolve();
    };
    assert.ok(model.isDirty);
    assert.ok(model.validate());
    assert.notOk(model.isSaving);
    route.submit();
  });

  test('it\'s cancel action cleans the record and redirects', function(assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('item', {});
    const route = this.owner.lookup('route:items/item/index');
    assert.expect(3);
    route.currentModel = model;
    route.transitionTo = routeName => assert.equal(routeName, 'items');
    assert.ok(model.isDirty);
    route.cancel();
    assert.ok(model.isClean);
  });
});
