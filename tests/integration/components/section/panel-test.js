import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | section/panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);
    await render(hbs`
      <Section::Panel as |panel|>
        <panel.header as |header|>
          <header.title>
            Title
          </header.title>
        </panel.header>
        <panel.body>
          Body
        </panel.body>
      </Section::Panel>
    `);
    assert.ok(find('.section-panel'));
    assert.equal(find('.section-panel-header').textContent.trim(), 'Title');
    assert.equal(find('.section-panel-body').textContent.trim(), 'Body');
  });
});
