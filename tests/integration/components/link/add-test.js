import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | link/add', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Link::Add>
        Create Something New
      </Link::Add>
    `);
    assert.equal(this.element.textContent.trim(), 'Create Something New');
    assert.ok(find('svg'), 'SVG exists in this link');
  });
});
