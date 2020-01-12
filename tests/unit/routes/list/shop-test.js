import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | list/shop', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:list/shop');
    assert.ok(route);
  });
});
