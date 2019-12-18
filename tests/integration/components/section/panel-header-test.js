import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | section/panel-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <Section::PanelHeader as |header|>
        <header.title>
          Title
        </header.title>
      </Section::PanelHeader>
    `);
    assert.equal(this.element.textContent.trim(), 'Title');
    assert.ok(find('.section-panel-header'));
  });
});
