import EmberObject from '@ember/object';
import PersitenceRouteMixinMixin from 'shopping-list-ui/mixins/persitence-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | persitence-route-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let PersitenceRouteMixinObject = EmberObject.extend(PersitenceRouteMixinMixin);
    let subject = PersitenceRouteMixinObject.create();
    assert.ok(subject);
  });
});
