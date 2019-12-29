import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, fillIn, click, settled  } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | items/item/categories/category', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /items/:item_id/categories/:category_id', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(1);
    await visit(url);
    await a11yAudit();
    assert.equal(currentURL(), url);
  });

  test('second pane is active', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(1);
    await visit(url);
    assert.ok(find('.layout-split > .pane:nth-child(2).active'), 'second pane is active');
  });

  test('canceling changes redirects to /items/:item_id', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(2);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('.button-cancel');
    assert.equal(currentURL(), `/items/${item.id}`);
  });

  test('cannot save an invalid record (e.g. with blank name field)', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', '');
    await click('.button-save');
    await a11yAudit();
    assert.equal(find('.field-error').textContent.trim(), 'This field is required.', 'Error message is present.');
    assert.equal(currentURL(), url, 'Remained on current route')
  });

  test('can change name save record', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', 'Test Category Name');
    await click('.button-save');
    await settled();
    assert.equal(currentURL(), `/items/${item.id}`, 'Transitioned to items/item after save.');
    assert.equal(findAll('.pane .list-group ul.list')[1].textContent.trim(), 'Test Category Name', 'Correctly save new name.')
  });


  test('can cancel delete through confirmation modal', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(4);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('.button-delete');
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    await settled();
    assert.equal(currentURL(), url, 'Remained in the /items/item/categories/category route after cancel delete.');
    assert.notOk(find('.confirm'), 'Modal is dismissed');

  });

  test('can accept delete through confirmation modal', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(4);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('.button-delete');
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
    await click('.confirm-button-unsafe');
    await settled();  // wait for the async delete to finish
    assert.equal(currentURL(), `/items/${item.id}`, 'Deleted record and redirected to /items');
    assert.notOk(find('.confirm'), 'Modal is dismissed');
  });

  test('can cancel navigation through confirmation modal', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(4);
    await visit(url);
    await fillIn('input[name="name"]', 'Test Category Name');
    assert.equal(currentURL(), url);
    await visit(`/items/${item.id}`).catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because item has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    assert.equal(currentURL(), url, 'Remained on current route');
  });

  test('can abandon changes through confirmation modal', async function(assert) {
    let item;
    this.server.createList('item-category', 1).map(category => {
      item = this.server.create('item', 1, {category});
    });
    const url = `/items/${item.id}/categories/${item.categoryId}`;
    assert.expect(4);
    await visit(url);
    await fillIn('[name="name"]', 'Test Category Name');
    assert.equal(currentURL(), url);
    await visit(`/items/${item.id}`).catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because item has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
    await click('.confirm-button-unsafe');
    assert.equal(currentURL(), `/items/${item.id}`, 'Abandoned changes and navigated to desired route');
  });
});
