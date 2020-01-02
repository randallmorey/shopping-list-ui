import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | multiline/line', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2)

    await render(hbs`<Multiline::Line>primary</Multiline::Line>`);
    assert.equal(find('.multiline-line').textContent.trim(), 'primary');

    await render(hbs`<Multiline::Line @secondary={{true}}>
        secondary
      </Multiline::Line>`);
    assert.equal(find('.multiline-line-secondary').textContent.trim(), 'secondary');
  });
});
