import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | slugify', function(hooks) {
  setupRenderingTest(hooks);

  test('it converts a string to a slug', async function(assert) {
    this.set('inputValue', 'Foo bar');
    await render(hbs`{{slugify inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'foo-bar');
  });
});
