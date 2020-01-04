import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/field/integer', function(hooks) {
  setupRenderingTest(hooks);
  this.noop = () => {};

  test('it renders', async function(assert) {
    assert.expect(4)
    await render(hbs`
      <Form::Field::Integer
      @value="1"
      @increment={{this.noop}}
      @decrement={{this.noop}}
      />
    `);

    assert.ok(find('.field-integer'), 'Renders field integer component.');
    assert.ok(find('.button-increment'), 'Renders increment button.');
    assert.ok(find('.button-decrement'), 'Renders decrement button.');
    assert.equal(find('.field-integer-quantity').textContent.trim(), '1', 'Renders text in integer column.');

  });


});
