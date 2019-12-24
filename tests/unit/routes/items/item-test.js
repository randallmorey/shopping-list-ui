import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | items/item', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:items/item');
    assert.ok(route);
  });
});
