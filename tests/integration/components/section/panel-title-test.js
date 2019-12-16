import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | section/panel-title', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <Section::PanelTitle>
        Title
      </Section::PanelTitle>
    `);
    assert.equal(this.element.textContent.trim(), 'Title');
    assert.ok(find('h1.section-panel-heading'));
  });
});
