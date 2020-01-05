import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders unchecked box', async function(assert) {
    this.noop = () => {};

    assert.expect(3)
    await render(hbs`
      <Checkbox
      @toggleAction={{this.noop}}
      @checked={{false}}
      >
      Checkbox Test
      </Checkbox>
    `);

    assert.ok(find('.list-item-link'), 'renders list item link');
    assert.ok(find('.tag-outlined'), 'renders outlined tag as checkbox');
    assert.notOk(find('.fa-check'), 'does not have checked icon');

  });

  test('it renders checked box', async function(assert) {
    this.noop = () => {};

    assert.expect(3)
    await render(hbs`
      <Checkbox
      @toggleAction={{this.noop}}
      @checked={{true}}
      >
      Checkbox Test
      </Checkbox>
    `);

    assert.ok(find('.list-item-link'), 'renders list item link');
    assert.ok(find('.tag-outlined'), 'renders outlined tag as checkbox');
    assert.ok(find('.fa-check'), 'has checked icon');

  });
});
