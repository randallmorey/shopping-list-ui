import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | list/list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders unordered list by default', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <List::List as |list|>
        <list.item>template block text</list.item>
      </List::List>
    `);
    assert.ok(find('ul'));
    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it can render an ordered list', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <List::List @ordered={{true}} as |list|>
        <list.item>template block text</list.item>
      </List::List>
    `);
    assert.ok(find('ol'));
    assert.equal(this.element.textContent.trim(), 'template block text');
  });

});
