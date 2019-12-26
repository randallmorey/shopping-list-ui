import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, click, fillIn, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | items/new', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /items/new', async function(assert) {
    const url = '/items/new';
    assert.expect(1);
    await visit(url);
    await a11yAudit();
    assert.equal(currentURL(), url);
  });

  test('can navigate to /items/new from /items', async function(assert) {
    const url = '/items/new';
    assert.expect(1);
    await visit('/items');
    await click('.link-add');
    assert.equal(currentURL(), url);
  });

  // test('canceling changes redirects to /items', async function(assert) {
  //   const url = '/items/new';
  //   assert.expect(2);
  //   await visit(url);
  //   assert.equal(currentURL(), url);
  //   await click('[type="button"]');
  //   assert.equal(currentURL(), "/items");
  // });
  //
  test('cannot save an invalid record (e.g. with blank name field)', async function(assert) {
    const url = '/items/new';
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', '');
    await click('.button-save');
    await a11yAudit();
    assert.equal(find('.help.is-danger').textContent.trim(), 'This field is required.', 'Error message is present.');
    assert.equal(currentURL(), url, 'Remained on current route')
  });


  test('can enter name and save record', async function(assert) {
    assert.expect(2);
    const url = '/items/new';
    await visit(url);
    await fillIn('[name="name"]', 'test name');
    await click('.button-save');
    await settled();
    const itemUrl = `/items/${this.server.db.items[0].id}`
    assert.equal(currentURL(), itemUrl, 'Navigate to new item url after save.');
    assert.equal(find('.pane:first-child .list-group ul.list li').textContent.trim(), 'test name', 'New item name saved correctly.')
  });
  //
  // test('redirects to /items after save', async function(assert) {
  //   const item = this.server.create('item', 1);
  //   const url = `/items/${item.id}`;
  //   assert.expect(1);
  //   await visit(url);
  //   await fillIn('[name="name"]', 'New Name');
  //   await click('.button-save');
  //   await settled();
  //   assert.equal(currentURL(), '/items', 'Transitioned to /items after save')
  // });
  //
  // test('can cancel delete through confirmation modal', async function(assert) {
  //   const item = this.server.create('item', 1);
  //   const url = `/items/${item.id}`;
  //   assert.expect(4);
  //   await visit(url);
  //   assert.equal(currentURL(), url);
  //   await click('.button-delete');
  //   await a11yAudit();
  //   assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
  //   await click('.confirm-button-safe');
  //   assert.equal(currentURL(), url, 'Remained on current route');
  //   assert.notOk(find('.confirm'), 'Modal is dismissed');
  // });
  //
  // test('can accept delete through confirmation modal', async function(assert) {
  //   const item = this.server.create('item', 1);
  //   const url = `/items/${item.id}`;
  //   assert.expect(4);
  //   await visit(url);
  //   assert.equal(currentURL(), url);
  //   await click('.button-delete');
  //   await a11yAudit();
  //   assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
  //   await click('.confirm-button-unsafe');
  //   await settled();  // wait for the async delete to finish
  //   assert.equal(currentURL(), '/items', 'Deleted record and redirected to /items');
  //   assert.notOk(find('.confirm'), 'Modal is dismissed');
  // });
  //
  // test('can cancel navigation through confirmation modal', async function(assert) {
  //   const item = this.server.create('item', 1);
  //   const url = `/items/${item.id}`;
  //   assert.expect(4);
  //   await visit(url);
  //   await fillIn('[name="name"]', 'Test Item Name');
  //   assert.equal(currentURL(), url);
  //   await visit('/items').catch(() => assert.equal(currentURL(), url,
  //     'URL is unchanged because item has changes'));
  //   await a11yAudit();
  //   assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
  //   await click('.confirm-button-safe');
  //   assert.equal(currentURL(), url, 'Remained on current route');
  // });
  //
  // test('can abandon changes through confirmation modal', async function(assert) {
  //   const item = this.server.create('item', 1);
  //   const url = `/items/${item.id}`;
  //   assert.expect(4);
  //   await visit(url);
  //   await fillIn('[name="name"]', 'Test Item Name');
  //   assert.equal(currentURL(), url);
  //   await visit('/items').catch(() => assert.equal(currentURL(), url,
  //     'URL is unchanged because item has changes'));
  //   await a11yAudit();
  //   assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
  //   await click('.confirm-button-unsafe');
  //   assert.equal(currentURL(), '/items', 'Abandoned changes and navigated to desired route');
  // });
});
