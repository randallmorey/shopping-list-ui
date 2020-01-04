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
});
