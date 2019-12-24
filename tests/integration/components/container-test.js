import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <Container>
        template block text
      </Container>
    `);
    assert.equal(this.element.textContent.trim(), 'template block text');
    assert.ok(find('.container'));
  });
});
