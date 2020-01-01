import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | shopping-lists/shopping-list/shopping-list-items/shopping-list-item', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:shopping-lists/shopping-list/shopping-list-items/shopping-list-item');
    assert.ok(route);
  });
});
