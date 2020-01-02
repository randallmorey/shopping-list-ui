import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | shopping lists/shopping list/shopping list items', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /lists/:id/items', async function(assert) {
    assert.expect(1);
    this.server.create('shopping-list');
    await visit('/lists/1/items');
    assert.equal(currentURL(), '/lists/1/items');
  });

  test('first pane is active', async function(assert) {
    assert.expect(1);
    this.server.create('shopping-list');
    await visit('/lists/1/items');
    assert.ok(find('.layout-split > .pane:nth-child(1).active'), 'first pane is active');
  });
});
