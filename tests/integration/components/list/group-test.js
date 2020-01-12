import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { textContent } from '../../../helpers/text-content';

module('Integration | Component | list/group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      <List::Group as |group|>
        <group.heading>
            Heading
        </group.heading>
        <group.list as |list|>
          <list.item as |listItem|>
            Item
          </list.item>
        </group.list>
      </List::Group>
    `);

    assert.equal(textContent('h2.list-heading'), 'Heading');
    assert.equal(textContent('li.list-item'), 'Item');
    assert.ok(find('.list-group'));
  });
});
