import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, click, fillIn, settled } from '@ember/test-helpers';
import { drag }  from 'ember-sortable/test-support/helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | stores/store', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /stores/:store_id', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(1);
    await visit(url);
    await a11yAudit();
    assert.equal(currentURL(), url);
  });

  test('second pane is active', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(1);
    await visit(url);
    assert.ok(find('.layout-split > .pane:nth-child(2).active'), 'second pane is active');
  });

  test('can navigate to /stores/:store_id from /stores', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(1);
    await visit('/stores');
    await click('.list-item-link');
    assert.equal(currentURL(), url);
  });

  test('canceling changes redirects to /stores', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(2);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('[type="button"]');
    assert.equal(currentURL(), "/stores");
  });

  test('cannot save an invalid record (e.g. with blank name field)', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', '');
    await click('.button-save');
    await a11yAudit();
    assert.equal(find('.field-error').textContent.trim(), 'This field is required.', 'Error message is present.');
    assert.equal(currentURL(), url, 'Remained on current route')
  });

  test('can change name and location and save record', async function(assert) {
    assert.expect(3);
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    await visit(url);
    await fillIn('[name="name"]', 'Test Store Name');
    await fillIn('[name="location"]', 'Test Store Location');
    await click('.button-save');
    await settled();
    assert.equal(currentURL(), '/stores');
    assert.equal(find('.multiline-line').textContent.trim(), 'Test Store Name')
    assert.equal(find('.multiline-line-secondary').textContent.trim(), 'Test Store Location')
  });

  test('can save record without location', async function(assert) {
    assert.expect(3);
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    await visit(url);
    await fillIn('[name="name"]', 'Test Store Name');
    await fillIn('[name="location"]', '');
    await click('.button-save');
    await settled();
    assert.equal(currentURL(), '/stores');
    assert.equal(find('.multiline-line').textContent.trim(), 'Test Store Name')
    assert.equal(find('.multiline-line-secondary').textContent.trim(), '')
  });

  test('redirects to /stores after save', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(1);
    await visit(url);
    await fillIn('[name="name"]', 'New Name');
    await click('.button-save');
    await settled();
    assert.equal(currentURL(), '/stores', 'Transitioned to /stores after save')
  });

  test('can cancel delete through confirmation modal', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(4);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('.button-delete');
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    assert.equal(currentURL(), url, 'Remained on current route');
    assert.notOk(find('.confirm'), 'Modal is dismissed');
  });

  test('can accept delete through confirmation modal', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(4);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('.button-delete');
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
    await click('.confirm-button-unsafe');
    await settled();  // wait for the async delete to finish
    assert.equal(currentURL(), '/stores', 'Deleted record and redirected to /stores');
    assert.notOk(find('.confirm'), 'Modal is dismissed');
  });

  test('can cancel navigation through confirmation modal', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(4);
    await visit(url);
    await fillIn('[name="name"]', 'Test store Name');
    assert.equal(currentURL(), url);
    await visit('/stores').catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because store has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    assert.equal(currentURL(), url, 'Remained on current route');
  });

  test('can abandon changes through confirmation modal', async function(assert) {
    const store = this.server.create('store', 1);
    const url = `/stores/${store.id}`;
    assert.expect(4);
    await visit(url);
    await fillIn('[name="name"]', 'Test store Name');
    assert.equal(currentURL(), url);
    await visit('/stores').catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because store has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
    await click('.confirm-button-unsafe');
    assert.equal(currentURL(), '/stores', 'Abandoned changes and navigated to desired route');
  });

  test('does nothing interesting when store item categories are synchronised with item categories', async function(assert) {
    const store = this.server.create('store');
    this.server.createList('item-category', 3).map(itemCategory => {
      this.server.create('store-item-category', {
        storeProperty: store,
        itemCategory
      });
    });
    const url = `/stores/${store.id}`;
    assert.expect(2);
    assert.equal(this.server.db.storeItemCategories.length, 3);
    await visit(url);
    assert.equal(this.server.db.storeItemCategories.length, 3);
  });

  test('adds missing store item categories', async function(assert) {
    const store = this.server.create('store');
    this.server.createList('item-category', 3);
    const url = `/stores/${store.id}`;
    assert.expect(2);
    assert.equal(this.server.db.storeItemCategories.length, 0);
    await visit(url);
    assert.equal(this.server.db.storeItemCategories.length, 3);
  });

  test('removes orphaned store item categories (those without item categories)', async function(assert) {
    const store = this.server.create('store');
    this.server.createList('store-item-category', 3, {storeProperty: store});
    const url = `/stores/${store.id}`;
    assert.expect(2);
    assert.equal(this.server.db.storeItemCategories.length, 3);
    await visit(url);
    assert.equal(this.server.db.storeItemCategories.length, 0);
  });

  test('reconciles store item categories with item categories', async function(assert) {
    const store = this.server.create('store');
    this.server.createList('item-category', 3).map(itemCategory => {
      this.server.create('store-item-category', {
        storeProperty: store,
        itemCategory
      });
    });
    // unassociated item categories
    this.server.createList('item-category', 4);
    // orphaned store item categories
    this.server.createList('store-item-category', 2, {storeProperty: store});
    const url = `/stores/${store.id}`;
    assert.expect(2);
    assert.equal(this.server.db.storeItemCategories.length, 5);
    await visit(url);
    assert.equal(this.server.db.storeItemCategories.length, 7);
  });

  test('first decrease and last increase buttons are disabled', async function(assert) {
    assert.expect(6)
    const store = this.server.create('store');
    this.server.createList('item-category', 3).map(itemCategory => {
      this.server.create('store-item-category', {
        storeProperty: store,
        itemCategory
      });
    });
    const url = `/stores/${store.id}`;

    await visit(url);
    const decreaseButtons = findAll('.button-order-decrease')
    assert.ok(decreaseButtons[0].disabled)
    assert.notOk(decreaseButtons[1].disabled)
    assert.notOk(decreaseButtons[2].disabled)

    const increaseButtons = findAll('.button-order-increase')
    assert.notOk(increaseButtons[0].disabled)
    assert.notOk(increaseButtons[1].disabled)
    assert.ok(increaseButtons[2].disabled)
  });

  test('store category item order may be decreased', async function(assert) {
    assert.expect(2);
    const store = this.server.create('store');
    this.server.createList('item-category', 2).map(itemCategory => {
      this.server.create('store-item-category', {
        storeProperty: store,
        itemCategory
      });
    });

    const url = `/stores/${store.id}`;
    assert.equal(this.server.db.storeItemCategories[1].order, 1);
    await visit(url);

    const decreaseButton = find('ol li:last-child .button-order-decrease');
    await click(decreaseButton);

    assert.equal(this.server.db.storeItemCategories[1].order, 0);

  });

  test('store category item order may be increased', async function(assert) {
    assert.expect(2);
    const store = this.server.create('store');
    this.server.createList('item-category', 2).map(itemCategory => {
      this.server.create('store-item-category', {
        storeProperty: store,
        itemCategory
      });
    });

    const url = `/stores/${store.id}`;
    assert.equal(this.server.db.storeItemCategories[0].order, 0);
    await visit(url);

    const increaseButton = find('ol li:first-child .button-order-increase');
    await click(increaseButton);

    assert.equal(this.server.db.storeItemCategories[0].order, 1);
  });

  test('drag down to reorder store category items', async function(assert) {
    assert.expect(2);
    this.drag = () => ({dy: 100, dx: undefined})
    const store = this.server.create('store');
    this.server.createList('item-category', 2).map(itemCategory => {
      this.server.create('store-item-category', {
        storeProperty: store,
        itemCategory
      });
    });
    const url = `/stores/${store.id}`;

    assert.equal(this.server.db.storeItemCategories[0].order, 0);
    await visit(url);
    await drag('mouse', 'ol li:first-child .drag-handle', this.drag)
    assert.equal(this.server.db.storeItemCategories[0].order, 1);

  });

  test('drag up to reorder store category items', async function(assert) {
    assert.expect(2);
    this.drag = () => ({dy: -100, dx: undefined})
    const store = this.server.create('store');
    this.server.createList('item-category', 2).map(itemCategory => {
      this.server.create('store-item-category', {
        storeProperty: store,
        itemCategory
      });
    });
    const url = `/stores/${store.id}`;

    assert.equal(this.server.db.storeItemCategories[1].order, 1);
    await visit(url);
    await drag('mouse', 'ol li:last-child .drag-handle', this.drag)
    assert.equal(this.server.db.storeItemCategories[1].order, 0);

  });

});
