import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { textContent } from '../../helpers/text-content';

module('Integration | Component | list-set', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);
    await render(hbs`
      <ListSet as |listSet|>
        <listSet.group as |group|>
          <group.heading>
              Heading
          </group.heading>
          <group.list as |list|>
            <list.item as |listItem|>
              Item
            </list.item>
          </group.list>
        </listSet.group>
        <listSet.emptyListMessage>
          Empty
        </listSet.emptyListMessage>
      </ListSet>
    `);

    assert.equal(textContent('h2.list-heading'), 'Heading');
    assert.equal(textContent('li.list-item'), 'Item');
    assert.equal(textContent('p.empty-list-message'), 'Empty');
    assert.ok(find('ul.list'));

  });
});
