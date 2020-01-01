import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | list/item/sortable', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // NOTE:  this component requires @decrease and @increase functions passed
    // into it.  While this test case doesn't use them, they are still required.
    // Try passing a "noop" function to these.  See other integration examples.

    // Test that a list item is rendered with the proper class name
    // Test that it contains the decrease and increase buttons
    // Test that it contains a grip handle
    // Test that it contains the block text

    await render(hbs`
      <List::Item::Sortable>
        template block text
      </List::Item::Sortable>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it calls decrease function on decrease button click', function(hooks) {

  });

  test('it calls increase function on decrease button click', function(hooks) {

  });
});
