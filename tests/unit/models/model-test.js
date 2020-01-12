import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | model', function(hooks) {
  setupTest(hooks);

  test('it sets `dateCreated` and `dateUpdated` on setAutoDateFields if `isNew` is truthy', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('model');
    assert.expect(5);
    assert.ok(model.isNew);
    assert.notOk(model.dateCreated);
    assert.notOk(model.dateUpdated);
    model.setAutoDateFields();
    assert.ok(model.dateCreated);
    assert.ok(model.dateUpdated);
  });

  test('it sets only `dateUpdated` on setAutoDateFields if `isNew` is not truthy', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('model');
    Object.defineProperty(model, 'isNew', {value: false});
    assert.expect(5);
    assert.notOk(model.isNew);
    assert.notOk(model.dateCreated);
    assert.notOk(model.dateUpdated);
    model.setAutoDateFields();
    assert.notOk(model.dateCreated);
    assert.ok(model.dateUpdated);
  });

  test('it sets nothing on setAutoDateFields if `isDeleted` is truthy', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('model');
    Object.defineProperty(model, 'isDeleted', {value: true});
    assert.expect(5);
    assert.ok(model.isDeleted);
    assert.notOk(model.dateCreated);
    assert.notOk(model.dateUpdated);
    model.setAutoDateFields();
    assert.notOk(model.dateCreated);
    assert.notOk(model.dateUpdated);
  });
});
