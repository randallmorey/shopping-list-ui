import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | list/item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <List::Item as |listItem|>
        <listItem.link @route="items.item" @model={{item}}>
          {{item.name}}
        </listItem.link>
        List item
      </List::Item>
    `);

    assert.equal(this.element.textContent.trim(), 'List item');
    assert.ok(find('li.list-item'));
  });
});
