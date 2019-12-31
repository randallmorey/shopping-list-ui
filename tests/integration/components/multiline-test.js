import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | multiline', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2)
    await render(hbs`
      <Multiline as |line|>
        <line>test</line>
      </Multiline>
    `);

    assert.ok(find('.multiline'));
    assert.ok(find('.multiline-line'))
  });
});
