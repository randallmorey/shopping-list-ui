import { module, test } from 'qunit';
import { visit, currentURL, find, click, settled } from '@ember/test-helpers';
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

  test('creates shopping list items for every item as needed', async function(assert) {
    assert.expect(2);
    const items = this.server.createList('item-category', 3).map(category =>
      this.server.create('item', {category})
    );
    const list = this.server.create('shopping-list');
    this.server.create('shopping-list-item', {list, item: items[0]});
    assert.equal(this.server.db.shoppingListItems.length, 1);
    await visit('/lists/1/items');
    assert.equal(this.server.db.shoppingListItems.length, 3);
  });

  test('deletes any shopping list items without inverse items', async function(assert) {
    assert.expect(2);
    const list = this.server.create('shopping-list');
    this.server.create('shopping-list-item', {list});
    assert.equal(this.server.db.shoppingListItems.length, 1);
    await visit('/lists/1/items');
    assert.equal(this.server.db.shoppingListItems.length, 0);
  });

  test('can clear shopping list items, resetting them to quantity 0', async function(assert) {
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 2});
    this.server.create('shopping-list-item', {list, item, quantity: 1});
    const url = '/lists/1/items'
    assert.expect(4);
    await visit(url);
    assert.equal(this.server.db.shoppingListItems[0].quantity, 2);
    await click('.button-clear');
    await settled();
    assert.equal(this.server.db.shoppingListItems[0].quantity, 0);
    assert.equal(this.server.db.shoppingListItems[1].quantity, 0);
    assert.equal(currentURL(), url);
  });
});
