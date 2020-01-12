import { module, test } from 'qunit';
import { visit, click, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | list/shop', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /list/shop', async function(assert) {
    assert.expect(1);
    const storeProperty = this.server.create('store');
    const category = this.server.create('item-category');
    this.server.create('store-item-category', {
      storeProperty,
      itemCategory: category
    });
    this.server.create('item', {category});
    this.server.create('item');
    await visit('/list/shop');
    await a11yAudit();
    assert.equal(currentURL(), '/list/shop');
  });

  test('can toogle purchased item using checkbox', async function(assert) {
    assert.expect(4);
    const storeProperty = this.server.create('store');
    const category = this.server.create('item-category');
    this.server.create('store-item-category', {
      storeProperty,
      itemCategory: category
    });
    this.server.create('item', {quantity: 1, purchased: false});
    await visit('/list/shop');
    assert.notOk(find('.tag-inverted'));
    assert.equal(this.server.db.items[0].purchased, false);
    await click('.list-item-link');
    assert.ok(find('.tag-inverted'));
    assert.equal(this.server.db.items[0].purchased, true);
  });
});
