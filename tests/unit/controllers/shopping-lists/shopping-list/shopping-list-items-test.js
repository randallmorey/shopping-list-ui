import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | shopping-lists/shopping-list/shopping-list-items', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:shopping-lists/shopping-list/shopping-list-items');
    assert.ok(controller);
  });
});