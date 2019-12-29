import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form/fieldset-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Form::FieldsetList @legend="Legend" as |list|>
        <list.item>
          Item
        </list.item>
      </Form::FieldsetList>
    `);

    assert.ok(find('.list'));
    assert.equal(find('legend').textContent.trim(), 'Legend');
    assert.equal(find('.list-item').textContent.trim(), 'Item');
  });
});
