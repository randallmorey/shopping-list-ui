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

  test('it\'s `isDirty` and `isClean` properties work', function (assert) {
    assert.expect(8);
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
    assert.equal(item.isDirty, false, 'Before changing an attribute, `isDirty` returns `false`');
    assert.equal(item.isClean, true, 'Before changing an attribute, `isClean` returns `true`');
    item.name = 'Changed';
    assert.equal(item.isDirty, true, 'After changing an attribute, `isDirty` returns `true`');
    assert.equal(item.isClean, false, 'After changing an attribute, `isClean` returns `false`');
    item.rollbackAttributes();
    assert.equal(item.isDirty, false, 'Before changing the relationship, `isDirty` returns `false`');
    assert.equal(item.isClean, true, 'Before changing the relationship, `isClean` returns `true`');
    item.category = null;
    assert.equal(item.isDirty, true, 'After changing the relationship, `isDirty` returns `true`');
    assert.equal(item.isClean, false, 'After changing the relationship, `isClean` returns `false`');
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

  test('it\'s `rollback()` method works for attributes and relationships', function (assert) {
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
    assert.notOk(item.get('name'), 'Before changing the name, it is not set');
    item.name = 'Test';
    item.category = null;
    assert.notOk(item.get('category.id'), 'After changing the relationship, it\'s ID is not set');
    assert.ok(item.get('name'), 'After changing the name, it is set');
    item.rollback();
    assert.ok(item.get('category.id'), 'After calling `rollback`, the relationship ID is set');
    assert.notOk(item.get('name'), 'After calling `rollback`, the name is not set');
  });
});
