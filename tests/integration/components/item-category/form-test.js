import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | item-category/form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.noop = () => {};

    await render(hbs`<ItemCategory::Form
      @title="Title"
      @submit={{this.noop}}
      @cancel={{this.noop}}
      @delete={{this.noop}}
      />`);

    assert.ok(find('form'));
  });
});
