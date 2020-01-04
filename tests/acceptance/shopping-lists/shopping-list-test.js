import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | shopping lists shopping list', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /lists/:id redirects to items', async function(assert) {
    assert.expect(1);
    this.server.create('shopping-list');
    await visit('/lists/1');
    assert.equal(currentURL(), '/lists/1/items');
  });
});
