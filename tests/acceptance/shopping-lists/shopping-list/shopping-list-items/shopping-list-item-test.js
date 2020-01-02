import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
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

  test('second pane is active', async function(assert) {
    const list = this.server.create('shopping-list');
    this.server.create('shopping-list-item', {list});
    assert.expect(1);
    await visit('/lists/1/items/1');
    assert.ok(find('.layout-split > .pane:nth-child(2).active'), 'second pane is active');
  });
});
