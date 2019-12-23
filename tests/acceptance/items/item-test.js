import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | items/item', function(hooks) {
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

  test('canceling changes redirects to /items', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(2);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('[type="button"]');
    assert.equal(currentURL(), "/items");
  });
});
