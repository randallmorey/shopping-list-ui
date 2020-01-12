import { module, test } from 'qunit';
import { visit, currentURL, find, click, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | list/manage', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /list/manage', async function(assert) {
    assert.expect(1);
    const category = this.server.create('item-category');
    this.server.create('item-category');
    this.server.create('item');
    this.server.create('item', {category});
    await visit('/list/manage');
    await a11yAudit();
    assert.equal(currentURL(), '/list/manage');
  });

  test('first pane is active', async function(assert) {
    assert.expect(1);
    this.server.create('item');
    await visit('/list/manage');
    assert.ok(find('.layout-split > .pane:nth-child(1).active'), 'first pane is active');
  });

  test('can clear shopping list items, resetting them to quantity 0 and purchased false', async function(assert) {
    this.server.create('item', {quantity: 1});
    this.server.create('item', {quantity: 2});
    this.server.create('item', {purchased: true});
    assert.expect(7);
    await visit('/list/manage');
    assert.equal(this.server.db.items[0].quantity, 1);
    assert.equal(this.server.db.items[1].quantity, 2);
    assert.equal(this.server.db.items[2].purchased, true);
    await click('.button-clear');
    await settled();
    assert.equal(this.server.db.items[0].quantity, 0);
    assert.equal(this.server.db.items[1].quantity, 0);
    assert.equal(this.server.db.items[2].purchased, false);
    assert.equal(currentURL(), '/');
  });
});
