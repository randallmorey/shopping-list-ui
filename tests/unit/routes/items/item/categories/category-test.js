import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | items/item/categories/category', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:items/item/categories/category');
    assert.ok(route);
  });
});
