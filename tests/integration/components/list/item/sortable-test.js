import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | list/item/sortable', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4)
    this.noop = () => {};

    await render(hbs`
      <List::Item::Sortable
        @decrease={{this.noop}}
        @increase={{this.noop}}>
        list item
      </List::Item::Sortable>
    `);

    assert.equal(find('.list-item-sortable').textContent.trim(), 'list item');
    assert.ok(find('.button-order-increase'), 'has increase button');
    assert.ok(find('.button-order-decrease'), 'has decrease button');
    assert.ok(find('.drag-handle'), 'has grip handle');

  });

  test('it calls decrease/increase functions on decrease/increase button click', async function(assert) {
    assert.expect(2);
    this.set('decrease', () => {
      assert.ok(true, 'Decrease was called');
    });
    this.set('increase', () => {
      assert.ok(true, 'Increase was called');
    });
    await render(hbs`
      <List::Item::Sortable
        @decrease={{this.decrease}}
        @increase={{this.increase}}>
        list item
      </List::Item::Sortable>
    `);
    await click('.button-order-increase');
    await click('.button-order-decrease');

  });
});
