import { module, test } from 'qunit';
import { visit, currentURL, find, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | shopping lists shopping list', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /lists/:id redirects to items', async function(assert) {
    assert.expect(1);
    this.server.create('shopping-list');
    await visit('/lists');
    assert.equal(currentURL(), '/lists/1/items');
  });
});
