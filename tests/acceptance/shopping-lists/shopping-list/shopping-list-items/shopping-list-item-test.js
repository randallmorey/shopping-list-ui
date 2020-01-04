import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | shopping lists/shopping list/shopping list items/shopping list item', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /lists/:id/items/:id with quantity of 1 or greater', async function(assert) {
    assert.expect(1);
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 1});
    await visit('/lists/1/items/1');
    assert.equal(currentURL(), '/lists/1/items/1');
  });

  test('second pane is active', async function(assert) {
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 1});
    assert.expect(1);
    await visit('/lists/1/items/1');
    assert.ok(find('.layout-split > .pane:nth-child(2).active'), 'second pane is active');
  });

  test('entering the route on a 0-quantity item sets its quantity to 1, saves, and redirects to items index', async function(assert) {
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 0});
    assert.expect(3);
    assert.equal(this.server.db.shoppingListItems[0].quantity, 0);
    await visit('/lists/1/items/1');
    assert.equal(this.server.db.shoppingListItems[0].quantity, 1);
    assert.equal(currentURL(), '/lists/1/items');
  });
});
