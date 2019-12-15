import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | layouts/layout-split', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <Layouts::LayoutSplit as |layout|>
        <layout.pane>
          This is a pane.
        </layout.pane>
      </Layouts::LayoutSplit>
    `);
    assert.equal(this.element.textContent.trim(), 'This is a pane.');
    assert.ok(find('.layout-split .pane'));
  });
});
