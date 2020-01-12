import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/field/select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);
    this.onChange = () => {};
    await render(hbs`
      <Form::Field::Select @onChange={{this.onChange}} as |xs|>
        <xs.option @value="ok">Ok</xs.option>
      </Form::Field::Select>
    `);
    assert.equal(this.element.textContent.trim(), 'Ok');
  });
});
