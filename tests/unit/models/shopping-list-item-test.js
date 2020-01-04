import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | shopping list item', function(hooks) {
  setupTest(hooks);

  test('it validates quantity is an integer >= 0', function(assert) {
    assert.expect(4);
    const store = this.owner.lookup('service:store');
    const list = store.createRecord('shopping-list');
    const item = store.createRecord('item');
    const model = store.createRecord('shopping-list-item', {
      item,
      list,
      quantity: 0
    });
    assert.ok(model.validate());
    model.quantity = -1;
    assert.notOk(model.validate());
    model.quantity = 1.5;
    assert.notOk(model.validate());
    model.quantity = 1;
    assert.ok(model.validate());
  });
});
