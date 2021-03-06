import { module, test } from 'qunit';
import { visit, currentURL, find, click, fillIn, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | stores/new', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /stores/new', async function(assert) {
    const url = '/stores/new';
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

  test('can navigate to /stores/new from /stores', async function(assert) {
    const url = '/stores/new';
    assert.expect(1);
    await visit('/stores');
    await click('.link-add');
    assert.equal(currentURL(), url);
  });

  test('canceling changes redirects to /stores', async function(assert) {
    const url = '/stores/new';
    assert.expect(2);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('[type="button"]');
    assert.equal(currentURL(), "/stores");
  });

  test('cannot save an invalid record (e.g. with blank name field)', async function(assert) {
    const url = '/stores/new';
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', '');
    await click('.button-save');
    await a11yAudit();
    assert.equal(find('.field-error').textContent.trim(), 'This field is required.', 'Error message is present.');
    assert.equal(currentURL(), url, 'Remained on current route')
  });


  test('can enter name and location and save record', async function(assert) {
    const url = '/stores/new';
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', 'Test store Name');
    await fillIn('[name="location"]', 'Test store Location');
    await click('.button-save');
    await settled();
    assert.equal(find('.multiline-line').textContent.trim(), 'Test store Name')
    assert.equal(find('.multiline-line-secondary').textContent.trim(), 'Test store Location')
  });

  test('can save record without location', async function(assert) {
    const url = '/stores/new';
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', 'Test store Name');
    await click('.button-save');
    await settled();
    assert.equal(find('.multiline-line').textContent.trim(), 'Test store Name')
    assert.equal(find('.multiline-line-secondary').textContent.trim(), '')
  });

  test('redirects to /stores/:store-id after save', async function(assert) {
    const url = '/stores/new';
    assert.expect(1);
    await visit(url);
    await fillIn('[name="name"]', 'Test store Name');
    await click('.button-save');
    await settled();
    const storeUrl = `/stores/${this.server.db.stores[0].id}`
    assert.equal(currentURL(), storeUrl, 'Navigate to new store url after save.');
  });

  test('can cancel navigation through confirmation modal', async function(assert) {
    const url = '/stores/new';
    assert.expect(3);
    await visit(url);
    await fillIn('[name="name"]', 'Test store Name');
    await visit('/stores').catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because store has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    assert.equal(currentURL(), url, 'Remained on current route');
  });

  test('can abandon changes through confirmation modal', async function(assert) {
    const url = '/stores/new';
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
});
