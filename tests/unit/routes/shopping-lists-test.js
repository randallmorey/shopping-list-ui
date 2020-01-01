import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | shopping-lists', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:shopping-lists');
    assert.ok(route);
  });
});
