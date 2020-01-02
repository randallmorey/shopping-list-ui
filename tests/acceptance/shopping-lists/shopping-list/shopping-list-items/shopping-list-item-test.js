import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | shopping lists/shopping list/shopping list items/shopping list item', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /lists/:id/items/:id', async function(assert) {
    assert.expect(1);
    const list = this.server.create('shopping-list');
    this.server.create('shopping-list-item', {list});
    await visit('/lists/1/items/1');
    assert.equal(currentURL(), '/lists/1/items/1');
  });
});
