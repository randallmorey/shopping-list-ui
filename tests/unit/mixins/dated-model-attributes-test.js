import EmberObject from '@ember/object';
import DatedModelAttributesMixin from 'shopping-list-ui/mixins/dated-model-attributes';
import { module, test } from 'qunit';

module('Unit | Mixin | dated-model-attributes', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    // eslint-disable-next-line ember/no-new-mixins
    let DatedModelAttributesObject = EmberObject.extend(DatedModelAttributesMixin);
    let subject = DatedModelAttributesObject.create();
    assert.ok(subject);
  });
});
