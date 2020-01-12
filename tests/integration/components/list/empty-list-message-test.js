import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | list/empty-list-message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <List::EmptyListMessage>
        Message
      </List::EmptyListMessage>
    `);

    assert.equal(this.element.textContent.trim(), 'Message');
    assert.ok(find('p.empty-list-message'));

  });
});
