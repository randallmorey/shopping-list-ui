import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Mixin | tracked-model-relationships', function(hooks) {
  setupTest(hooks);

  test('it\'s `hasDirtyRelationships` property works for unintialized relationships', function (assert) {
    assert.expect(2);
    const store = this.owner.lookup('service:store');
    const item = store.createRecord('item');
    store.push({
      data: [{id: '1', type: 'item-category'}]
    });
    const category = store.peekRecord('item-category', '1');
    assert.equal(item.hasDirtyRelationships, false, 'Before changing the relationship, `hasDirtyRelationships` returns `false`');
    item.category = category;
    assert.equal(item.hasDirtyRelationships, true, 'After changing the relationship, `hasDirtyRelationships` returns `true`');
  });

  test('it\'s `hasDirtyRelationships` property works for intialized relationships', function (assert) {
    assert.expect(2);
    const store = this.owner.lookup('service:store');
    store.push({
      data: [
        {id: '1', type: 'item-category'},
        {id: '2', type: 'item', relationships: {
          category: {data: {type: 'item-category', id: '1'}}
        }}
      ]
    });
    const item = store.peekRecord('item', '2');
    assert.equal(item.hasDirtyRelationships, false, 'Before changing the relationship, `hasDirtyRelationships` returns `false`');
    item.category = null;
    assert.equal(item.hasDirtyRelationships, true, 'After changing the relationship, `hasDirtyRelationships` returns `true`');
  });

  test('it\'s `rollbackRelationships()` method works for unintialized relationships', function (assert) {
    assert.expect(6);
    const store = this.owner.lookup('service:store');
    const item = store.createRecord('item');
    store.push({
      data: [{id: '1', type: 'item-category'}]
    });
    const category = store.peekRecord('item-category', '1');
    assert.notOk(item.get('category.id'), 'Before changing the relationship, it\'s ID is not set');
    assert.equal(item.hasDirtyRelationships, false, 'Before changing the relationship, `hasDirtyRelationships` returns `false`');
    item.category = category;
    assert.ok(item.get('category.id'), 'After changing the relationship, it\'s ID is set');
    assert.equal(item.hasDirtyRelationships, true, 'After changing the relationship, `hasDirtyRelationships` returns `true`');
    item.rollbackRelationships();
    assert.notOk(item.get('category.id'), 'After calling `rollbackRelationships`, the relationship ID is not set');
    assert.equal(item.hasDirtyRelationships, false, 'After rolling back relationships, `hasDirtyRelationships` returns `false`');
  });

  test('it\'s `rollbackRelationships()` method works for intialized relationships', function (assert) {
    assert.expect(6);
    const store = this.owner.lookup('service:store');
    store.push({
      data: [
        {id: '1', type: 'item-category'},
        {id: '2', type: 'item', relationships: {
          category: {data: {type: 'item-category', id: '1'}}
        }}
      ]
    });
    const item = store.peekRecord('item', '2');
    assert.ok(item.get('category.id'), 'Before changing the relationship, it\'s ID is set');
    assert.equal(item.hasDirtyRelationships, false, 'Before changing the relationship, `hasDirtyRelationships` returns `false`');
    item.category = null;
    assert.notOk(item.get('category.id'), 'After changing the relationship, it\'s ID is not set');
    assert.equal(item.hasDirtyRelationships, true, 'After changing the relationship, `hasDirtyRelationships` returns `true`');
    item.rollbackRelationships();
    assert.ok(item.get('category.id'), 'After calling `rollbackRelationships`, the relationship ID is set');
    assert.equal(item.hasDirtyRelationships, false, 'After rolling back relationships, `hasDirtyRelationships` returns `false`');
  });
});
