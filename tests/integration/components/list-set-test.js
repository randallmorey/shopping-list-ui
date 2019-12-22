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
        <listSet.heading>
            Heading
        </listSet.heading>
        <listSet.list as |list|>
          <list.item as |listItem|>
            Item
          </list.item>
        </listSet.list>
        <listSet.emptyListMessage>
          Empty
        </listSet.emptyListMessage>
      </ListSet>
    `);

    assert.equal(await textContent('h2.list-heading'), 'Heading');
    assert.equal(await textContent('li.list-item'), 'Item');
    assert.equal(await textContent('p.empty-list-message'), 'Empty');
    assert.ok(find('ul.list'));

  });
});
