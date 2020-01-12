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
    this.server.createList('store', 1);

    assert.expect(4);
    await visit('/');
    await click("a[title='Items']");
    assert.equal(currentURL(), '/items');

    await visit('/');
    await click("a[title='Stores']");
    assert.equal(currentURL(), '/stores');

    await visit('/');
    await click("a[title='List']");
    assert.equal(currentURL(), '/list/manage');

    await visit('/');
    await visit('/');
    await click("a[title^='Shopping']");
    assert.equal(currentURL(), '/list/shop');
  })
});
