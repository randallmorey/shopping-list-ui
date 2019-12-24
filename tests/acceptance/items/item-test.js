import { module, test } from 'qunit';
import { visit, currentURL, fillIn, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | items/item', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

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
