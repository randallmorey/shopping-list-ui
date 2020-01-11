import { module, test } from 'qunit';
import { visit, click, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | shopping lists/shopping list/shop', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /lists/:id/items', async function(assert) {
    assert.expect(1);
    const storeProperty = this.server.create('store');
    const itemCategory = this.server.create('item-category');
    this.server.create('store-item-category', {storeProperty, itemCategory});
    const list = this.server.create('shopping-list');
    const item = this.server.create('item', {category: itemCategory});
    const item2 = this.server.create('item');
    this.server.create('shopping-list-item', {list, item, quantity: 1});
    this.server.create('shopping-list-item', {list, item: item2, quantity: 1});
    await visit('/lists/1/shop');
    await a11yAudit();
    assert.equal(currentURL(), '/lists/1/shop');
  });

  test('can toogle purchased item using checkbox', async function(assert) {
    assert.expect(4);
    const storeProperty = this.server.create('store');
    const itemCategory = this.server.create('item-category');
    this.server.create('store-item-category', {storeProperty, itemCategory});
    const list = this.server.create('shopping-list');
    const item = this.server.create('item', {category: itemCategory});
    this.server.create('shopping-list-item', {list, item, quantity: 1, purchased: false});
    await visit('/lists/1/shop');
    assert.notOk(find('.tag-inverted'));
    assert.equal(this.server.db.shoppingListItems[0].purchased, false);
    await click('.list-item-link');
    assert.ok(find('.tag-inverted'));
    assert.equal(this.server.db.shoppingListItems[0].purchased, true);
  });

});
