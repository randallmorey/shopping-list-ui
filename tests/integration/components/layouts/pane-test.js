import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | layouts/pane', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`<Layouts::Pane>This is a pane.</Layouts::Pane>`);
    assert.equal(this.element.textContent.trim(), 'This is a pane.');
    assert.ok(find('.pane'));
  });

  test('it has an active class if active', async function(assert) {
    assert.expect(2);
    await render(hbs`<Layouts::Pane />`);
    assert.notOk(find('.active'));
    await render(hbs`<Layouts::Pane @active={{true}} />`);
    assert.ok(find('.active'));
  });
});
