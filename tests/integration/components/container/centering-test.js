import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | container/centering', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    // Template block usage:
    await render(hbs`
      <Container::Centering>
        template block text
      </Container::Centering>
    `);
    assert.equal(this.element.textContent.trim(), 'template block text');
    assert.ok(find('.container-centering'));
  });
});
