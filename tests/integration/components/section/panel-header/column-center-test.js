import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | section/panel-header/column-center', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Section::PanelHeader::ColumnCenter>
        template block text
      </Section::PanelHeader::ColumnCenter>
    `);
    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
