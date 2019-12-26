import EmberObject from '@ember/object';
import PersitenceRouteMixinMixin from 'shopping-list-ui/mixins/persitence-route';
import { module, test } from 'qunit';

module('Unit | Mixin | persitence-route', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let PersitenceRouteMixinObject =
      EmberObject.extend(PersitenceRouteMixinMixin); // eslint-disable-line ember/no-new-mixins
    let subject = PersitenceRouteMixinObject.create();
    assert.ok(subject);
  });
});
