import { module, test } from 'qunit';
import { visit, currentURL, find, click, fillIn, settled } from '@ember/test-helpers';
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

  test('second pane is active', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(1);
    await visit(url);
    assert.ok(find('.layout-split > .pane:nth-child(2).active'), 'second pane is active');
  });

  test('can navigate to /items/new from /items', async function(assert) {
    const url = '/items/new';
    assert.expect(1);
    await visit('/items');
    await click('.link-add');
    assert.equal(currentURL(), url);
  });

  test('canceling changes redirects to /items', async function(assert) {
    const url = '/items/new';
    assert.expect(2);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('[type="button"]');
    assert.equal(currentURL(), "/items");
  });

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
    const url = '/items/new';
    assert.expect(1);
    await visit(url);
    await fillIn('[name="name"]', 'Test Item Name');
    await click('.button-save');
    await settled();
    assert.equal(find('.pane:first-child .list-group ul.list li').textContent.trim(), 'Test Item Name', 'New item name saved correctly.')
  });

  test('redirects to /items/:item-id after save', async function(assert) {
    const url = '/items/new';
    assert.expect(1);
    await visit(url);
    await fillIn('[name="name"]', 'Test Item Name');
    await click('.button-save');
    await settled();
    const itemUrl = `/items/${this.server.db.items[0].id}`
    assert.equal(currentURL(), itemUrl, 'Navigate to new item url after save.');
  });

  test('can cancel navigation through confirmation modal', async function(assert) {
    const url = '/items/new';
    assert.expect(3);
    await visit(url);
    await fillIn('[name="name"]', 'Test Item Name');
    await visit('/items').catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because item has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    assert.equal(currentURL(), url, 'Remained on current route');
  });

  test('can abandon changes through confirmation modal', async function(assert) {
    const url = '/items/new';
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
