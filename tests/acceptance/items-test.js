import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | items', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /items', async function(assert) {
    await visit('/items');
    assert.equal(currentURL(), '/items');
  });
});
