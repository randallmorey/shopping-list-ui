import { module, test } from 'qunit';
import { visit, currentURL, find, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | items', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /items', async function(assert) {
    assert.expect(1);
    await visit('/items');
    await a11yAudit();
    assert.equal(currentURL(), '/items');
  });

  test('first pane is active', async function(assert) {
    assert.expect(1);
    await visit('/items');
    assert.ok(find('.layout-split > .pane:nth-child(1).active'), 'first pane is active');
  });

  test('can view item links', async function(assert) {
    assert.expect(1);
    this.server.createList('item', 3);
    await visit('/items');
    assert.equal(findAll('.list-item-link').length, 3);
  });
});
