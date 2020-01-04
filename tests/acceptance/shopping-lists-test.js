import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | shopping lists', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /lists without a list creates one and redirects', async function(assert) {
    assert.expect(3);
    assert.equal(this.server.db.shoppingLists.length, 0);
    await visit('/lists');
    assert.equal(this.server.db.shoppingLists.length, 1);
    assert.equal(currentURL(), '/lists/1/items');
  });

  test('visiting /lists when a list exists simply redirects', async function(assert) {
    assert.expect(3);
    this.server.create('shopping-list');
    assert.equal(this.server.db.shoppingLists.length, 1);
    await visit('/lists');
    assert.equal(this.server.db.shoppingLists.length, 1);
    assert.equal(currentURL(), '/lists/1/items');
  });
});
