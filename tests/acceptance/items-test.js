import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
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
});
