import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, click, fillIn, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | items/item/index', function(hooks) {
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

  test('second pane is active', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(1);
    await visit(url);
    assert.ok(find('.layout-split > .pane:nth-child(2).active'), 'second pane is active');
  });

  test('can navigate to /items/:item_id from /items', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(1);
    await visit('/items');
    await click('.list-item-link');
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

  test('cannot save an invalid record (e.g. with blank name field)', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(2);
    await visit(url);
    await fillIn('[name="name"]', '');
    await click('.button-save');
    await a11yAudit();
    assert.equal(find('.help.is-danger').textContent.trim(), 'This field is required.', 'Error message is present.');
    assert.equal(currentURL(), url, 'Remained on current route')
  });

  test('changing record\'s category moves it within the items list', async function(assert) {
    assert.expect(6);
    let items = [];
    this.server.createList('item-category', 2).map(category => {
      items.push(this.server.create('item', 1, {category}));
    });
    const url = `/items/${items[0].id}`;
    await visit(url);
    assert.equal(currentURL(), url)
    let lists = findAll('.pane:first-child .list-group ul.list').map(group => group.children.length)
    assert.equal(lists.length, 2, 'Two list groups for categories exist.')
    assert.equal(lists[0], 1, 'First list group has one item.')
    assert.equal(lists[1], 1, 'Second list group has one item.')
    await click(findAll('.pane:nth-child(2) .list-group ul.list label')[1])
    lists = findAll('.pane:first-child .list-group ul.list').map(group => group.children.length)
    assert.equal(lists.length, 1, 'Only one list group exist after changing one item category.')
    assert.equal(lists[0], 2, 'List group has now 2 items')

    // do an a11y test once the category is changed
  });

  test('can change name and category and save record', async function(assert) {
    assert.expect(5);
    let items = [];
    this.server.createList('item-category', 2).map(category => {
      items.push(this.server.create('item', 1, {category}));
    });
    const url = `/items/${items[0].id}`;
    await visit(url);
    await fillIn('[name="name"]', 'test name');
    assert.equal(items[0].category.name, findAll('.pane:nth-child(2) .list-group ul.list label')[0].textContent.trim())
    await click(findAll('.pane:nth-child(2) .list-group ul.list label')[1])
    await click('.button-save');
    assert.equal(currentURL(), url);
    assert.equal(findAll('.pane:first-child .list-group ul.list li')[1].textContent.trim(), 'test name')
    const lists = findAll('.pane:first-child .list-group ul.list').map(group => group.children.length)
    assert.equal(lists.length, 1, 'Only one list after saving.')
    assert.equal(lists[0], 2, 'List has 2 items.')
  });

  test('redirects to /items after save', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(1);
    await visit(url);
    await fillIn('[name="name"]', 'New Name');
    await click('.button-save');
    await settled();
    assert.equal(currentURL(), '/items', 'Transitioned to /items after save')
  });

  test('can cancel delete through confirmation modal', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(4);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('.button-delete');
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    assert.equal(currentURL(), url, 'Remained on current route');
    assert.notOk(find('.confirm'), 'Modal is dismissed');
  });

  test('can accept delete through confirmation modal', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(4);
    await visit(url);
    assert.equal(currentURL(), url);
    await click('.button-delete');
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
    await click('.confirm-button-unsafe');
    await settled();  // wait for the async delete to finish
    assert.equal(currentURL(), '/items', 'Deleted record and redirected to /items');
    assert.notOk(find('.confirm'), 'Modal is dismissed');
  });

  test('can cancel navigation through confirmation modal', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(4);
    await visit(url);
    await fillIn('[name="name"]', 'Test Item Name');
    assert.equal(currentURL(), url);
    await visit('/items').catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because item has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-safe'), 'Safe confirm action button is present');
    await click('.confirm-button-safe');
    assert.equal(currentURL(), url, 'Remained on current route');
  });

  test('can abandon changes through confirmation modal', async function(assert) {
    const item = this.server.create('item', 1);
    const url = `/items/${item.id}`;
    assert.expect(4);
    await visit(url);
    await fillIn('[name="name"]', 'Test Item Name');
    assert.equal(currentURL(), url);
    await visit('/items').catch(() => assert.equal(currentURL(), url,
      'URL is unchanged because item has changes'));
    await a11yAudit();
    assert.ok(find('.confirm .confirm-button-unsafe'), 'Unsafe confirm action button is present');
    await click('.confirm-button-unsafe');
    assert.equal(currentURL(), '/items', 'Abandoned changes and navigated to desired route');
  });
});
