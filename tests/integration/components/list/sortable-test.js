import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | list/sortable', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Test that an ordered list is rendered with the proper class name
    // Test that it yields a list item that can be rendered in its block

    await render(hbs`
      <List::Sortable>
        template block text
      </List::Sortable>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
