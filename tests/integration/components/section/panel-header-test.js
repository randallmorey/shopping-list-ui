import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | section/panel-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(7);
    await render(hbs`
      <Section::PanelHeader as |header|>
        <header.columnLeft>Left</header.columnLeft>
        <header.columnCenter>
          <header.title>
            Title
          </header.title>
        </header.columnCenter>
        <header.columnRight>Right</header.columnRight>
      </Section::PanelHeader>
    `);
    assert.ok(find('.section-panel-header-column-left'));
    assert.ok(find('.section-panel-header-column-center'));
    assert.ok(find('.section-panel-header-column-right'));
    assert.ok(find('.section-panel-header'));
    assert.equal(find('.section-panel-heading').textContent.trim(), 'Title');
    assert.equal(find('.section-panel-header-column-left').textContent.trim(), 'Left');
    assert.equal(find('.section-panel-header-column-right').textContent.trim(), 'Right');
  });
});
