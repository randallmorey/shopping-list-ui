import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, click, fillIn, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | items/item/index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /items/:item_id', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(1);
    await visit(url);
    await a11yAudit();
    assert.equal(currentURL(), url);
  });

  test('second pane is active', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(1);
    await visit(url);
    assert.ok(find('.layout-split > .pane:nth-child(2).active'), 'second pane is active');
  });

  test('can navigate to /items/:item_id from /items', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(1);
    await visit('/items');
    await click('.list-item-link');
    assert.equal(currentURL(), url);
  });

  test('canceling changes redirects to /items', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(2);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('[type="button"]');
    assert.equal(currentURL(), "/items");
  });

  test('cannot save an invalid record (e.g. with blank name field)', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', '');
    await click('.button-save');
    await a11yAudit();
    assert.equal(find('.field-error').textContent.trim(), 'This field is required.', 'Error message is present.');
    assert.equal(currentURL(), url, 'Remained on current route')
  });

  test('changing record\'s category moves it within the items list', async function(assert) {
    assert.expect(0);
    const firstCategory = this.server.create('item-category', {name: 'A'})
    const secondCategory = this.server.create('item-category', {name: 'B'})

    const item = this.server.create('item', {category: firstCategory})
    this.server.createList('item', 2, {category: secondCategory})

    const url = `/items/${item.id}`;
    await visit(url);

    console.log(find('.layout-split .pane:first-child .list-item-link:first-child'))

    await click('#category-1');
    console.log(find('.layout-split .pane:first-child .list-item-link:first-child'))

    await click('#category-0');
    console.log(find('.layout-split .pane:first-child .list-item-link:first-child'))

    // TODO do an a11y test once the category is changed
  });

  // TODO probably need to manually generate names for category in this case
  test('can change name and category and save record', async function(assert) {
    assert.expect(3);
    const firstCategory = this.server.create('item-category', 1, {name: 'FirstCategory'})
    const secondCategory = this.server.create('item-category', 1, {name: 'SecondCategory'})

    const item = this.server.create('item', 1, {category: firstCategory})

    assert.equal(item.category.name, 'FirstCategory');
    const url = `/items/${item.id}`;
    await visit(url);
    await fillIn('[name="name"]', 'Test Item Name');
    await click(find('#category-1'));
    await click('.button-save');
    assert.equal(item.category.name, 'SecondCategory');
    assert.equal(item.name, 'Test Item Name');

  });

  test('redirects to /items after save', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(1);
    await visit(url);
    await fillIn('[name="name"]', 'New Name');
    await click('.button-save');
    await settled();
    assert.equal(currentURL(), '/items', 'Transitioned to /items after save')
  });

  test('can cancel delete through confirmation modal', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
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
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(4);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('.button-delete');
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
    await click('.confirm-button-unsafe');
    await settled();  // wait for the async delete to finish
    assert.equal(currentURL(), '/items', 'Deleted record and redirected to /items');
    assert.notOk(find('.confirm'), 'Modal is dismissed');
  });

  test('can cancel navigation through confirmation modal', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(4);
    await visit(url);
    await fillIn('[name="name"]', 'Test Item Name');
    assert.equal(currentURL(), url);
    await visit('/items').catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because item has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    assert.equal(currentURL(), url, 'Remained on current route');
  });

  test('can abandon changes through confirmation modal', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(4);
    await visit(url);
    await fillIn('[name="name"]', 'Test Item Name');
    assert.equal(currentURL(), url);
    await visit('/items').catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because item has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
    await click('.confirm-button-unsafe');
    assert.equal(currentURL(), '/items', 'Abandoned changes and navigated to desired route');
  });
});
