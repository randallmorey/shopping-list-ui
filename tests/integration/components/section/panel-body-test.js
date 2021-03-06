import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | section/panel-body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <Section::PanelBody>
        Body
      </Section::PanelBody>
    `);
    assert.equal(this.element.textContent.trim(), 'Body');
    assert.ok(find('.section-panel-body'));
  });
});
