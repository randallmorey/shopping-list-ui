import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /', async function(assert) {
    assert.expect(1);
    await visit('/');
    await a11yAudit();
    assert.equal(currentURL(), '/');
  });

  test('home navigation works', async function(assert) {
    assert.expect(4);

    this.server.createList('store', 1);

    await visit('/');
    await click(".list:nth-child(2) .list-item:first-child a");
    assert.equal(currentURL(), '/items');

    await visit('/');
    await click(".list:nth-child(2) .list-item:nth-child(2) a");
    assert.equal(currentURL(), '/stores');

    await visit('/');
    await click(".list:nth-child(2) .list-item:nth-child(3) a");
    assert.equal(currentURL(), '/list/manage');

    await visit('/');
    await click(".list:nth-child(4) .list-item:first-child a");
    assert.equal(currentURL(), '/list/shop');
  })
});
