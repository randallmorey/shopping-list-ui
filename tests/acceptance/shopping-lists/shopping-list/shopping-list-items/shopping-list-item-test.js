import { module, test } from 'qunit';
import { visit, currentURL, find, fillIn, click, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | shopping lists/shopping list/shopping list items/shopping list item', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /lists/:id/items/:id with quantity of 1 or greater', async function(assert) {
    assert.expect(1);
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 1});
    await visit('/lists/1/items/1');
    await a11yAudit();
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

  test('can increase quantity and save item', async function(assert) {
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 1});
    assert.expect(4);
    await visit('/lists/1/items/1');
    assert.equal(this.server.db.shoppingListItems[0].quantity, 1);
    await click('.button-increment');
    assert.equal(find('.field-integer-quantity').textContent.trim(), '2');
    await click('.button-save');
    await settled();
    assert.equal(this.server.db.shoppingListItems[0].quantity, 2);
    assert.equal(currentURL(), '/lists/1/items');
  });

  test('can decrease quantity and save item', async function(assert) {
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 2});
    assert.expect(4);
    await visit('/lists/1/items/1');
    assert.equal(this.server.db.shoppingListItems[0].quantity, 2);
    await click('.button-decrement');
    assert.equal(find('.field-integer-quantity').textContent.trim(), '1');
    await click('.button-save');
    await settled();
    assert.equal(this.server.db.shoppingListItems[0].quantity, 1);
    assert.equal(currentURL(), '/lists/1/items');
  });

  test('can add notes and save item', async function(assert) {
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 1, notes: 'Notes Test'});
    assert.expect(3);
    await visit('/lists/1/items/1');
    assert.equal(this.server.db.shoppingListItems[0].notes, 'Notes Test');
    await fillIn('.textarea', 'New Notes');
    await click('.button-save');
    await settled();
    assert.equal(this.server.db.shoppingListItems[0].notes, 'New Notes');
    assert.equal(currentURL(), '/lists/1/items');
  });

  test('can clear items from item route', async function(assert) {
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 2});
    this.server.create('shopping-list-item', {list, item, quantity: 1});
    assert.expect(4);
    await visit('/lists/1/items/1');
    assert.equal(this.server.db.shoppingListItems[0].quantity, 2);
    await click('.button-clear');
    await settled();
    assert.equal(this.server.db.shoppingListItems[0].quantity, 0);
    assert.equal(this.server.db.shoppingListItems[1].quantity, 0);
    assert.equal(currentURL(), '/lists/1/items');
  });

  test('canceling changes redirects to /lists/1/items', async function(assert) {
    const list = this.server.create('shopping-list');
    const item = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 1});
    assert.expect(2);
    await visit('/lists/1/items/1');
    assert.equal(currentURL(), '/lists/1/items/1');
    await click('.button-cancel');
    assert.equal(currentURL(), '/lists/1/items');
  });

});
