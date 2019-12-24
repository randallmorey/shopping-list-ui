import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
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

  test('can navigate to /items/:item_id from /items', async function(assert) {
    assert.expect(0);
    // TODO
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
    assert.expect(0);
    // TODO
  });

  test('can see error message for invalid record (e.g. with blank name field)', async function(assert) {
    assert.expect(0);
    // TODO
    // do an a11y test once the error message is visible
  });

  test('changing record\'s category moves it within the items list', async function(assert) {
    assert.expect(0);
    // TODO
    // do an a11y test once the category is changed
  });

  test('can change name and category and save record', async function(assert) {
    assert.expect(0);
    // TODO
  });

  test('redirects to /items after save', async function(assert) {
    assert.expect(0);
    // TODO
  });
});
