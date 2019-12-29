import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/field/radio', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(5);
    await render(hbs`<Form::Field::Radio
      @label="Label"
      @id="test"
      @name="test"
      @value="value" as |field|>

      <div class="tester">Test</div>
      <field.error>Error message</field.error>

    </Form::Field::Radio>
    `);
    assert.equal(find('.label-radio').textContent.trim(), 'Label');
    assert.equal(find('.tester').textContent.trim(), 'Test');
    assert.equal(find('.field-error').textContent.trim(), 'Error message');
    assert.equal(find('#test').value, 'value');
    assert.equal(find('[name="test"]').value, 'value');
  });

  test('it displays error state', async function(assert) {
    assert.expect(2);
    this.hasError = false;
    await render(hbs`<Form::Field::Radio @hasError={{this.hasError}} />`);
    assert.notOk(find('.has-error'));
    this.set('hasError', true);
    assert.ok(find('.has-error'));
  });
});
