import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | list/heading', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <List::Heading>
        Heading
      </List::Heading>
    `);

    assert.equal(this.element.textContent.trim(), 'Heading');
    assert.ok(find('h2.list-heading'));

  });
});
