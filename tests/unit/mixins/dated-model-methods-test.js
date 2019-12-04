import EmberObject from '@ember/object';
import DatedModelMethodsMixin from 'shopping-list-ui/mixins/dated-model-methods';
import { module, test } from 'qunit';

module('Unit | Mixin | dated-model-methods', function() {
  test('it sets `dateCreated` and `dateUpdated` on save if `isNew` is truthy', function (assert) {
    const DatedModelMethodsObject = EmberObject.extend(DatedModelMethodsMixin);
    const subject = DatedModelMethodsObject.create({isNew: true});
    assert.notOk(subject.dateCreated);
    assert.notOk(subject.dateUpdated);
    subject.save();
    assert.ok(subject.dateCreated);
    assert.ok(subject.dateUpdated);
  });
  test('it sets only `dateUpdated` on save if `isNew` is not truthy', function (assert) {
    const DatedModelMethodsObject = EmberObject.extend(DatedModelMethodsMixin);
    const subject = DatedModelMethodsObject.create();
    assert.notOk(subject.dateCreated);
    assert.notOk(subject.dateUpdated);
    subject.save();
    assert.notOk(subject.dateCreated);
    assert.ok(subject.dateUpdated);
  });
  test('it sets nothing on save if `isDeleted` is truthy', function (assert) {
    const DatedModelMethodsObject = EmberObject.extend(DatedModelMethodsMixin);
    const subject = DatedModelMethodsObject.create({isDeleted: true});
    assert.notOk(subject.dateCreated);
    assert.notOk(subject.dateUpdated);
    subject.save();
    assert.notOk(subject.dateCreated);
    assert.notOk(subject.dateUpdated);
  });
});
