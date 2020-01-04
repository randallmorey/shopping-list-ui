import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | shopping-lists/shopping-list/shop', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:shopping-lists/shopping-list/shop');
    assert.ok(controller);
  });
});
