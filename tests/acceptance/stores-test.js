import { module, test } from 'qunit';
import { visit, currentURL, find, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | stores', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /stores', async function(assert) {
    assert.expect(1);
    await visit('/stores');
    await a11yAudit();
    assert.equal(currentURL(), '/stores');
  });

  test('first pane is active', async function(assert) {
    assert.expect(1);
    await visit('/stores');
    assert.ok(find('.layout-split > .pane:nth-child(1).active'), 'first pane is active');
  });

  test('can view store links', async function(assert) {
    assert.expect(1);
    this.server.createList('store', 3);
    await visit('/stores');
    assert.equal(findAll('.list-item-link').length, 3);
  });
});
