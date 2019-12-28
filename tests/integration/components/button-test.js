import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders block content', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button>Test</Button>`);
    assert.equal(this.element.textContent.trim(), 'Test');
  });

  test('it renders a button of type button or submit', async function(assert) {
    assert.expect(2);
    await render(hbs`<Button />`);
    assert.ok(find('button:not([type="submit"])'), 'Button is not a submit');
    await render(hbs`<Button @submit={{true}} />`);
    assert.ok(find('button[type="submit"]'), 'Button is a submit');
  });

  test('it supports a loading state', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button @loading={{true}} />`);
    assert.ok(find('button.is-loading'), 'Button has is-loading class');
  });

  test('it supports a disabled state', async function(assert) {
    assert.expect(2);
    await render(hbs`<Button @disabled={{false}} />`);
    assert.ok(find('button:not([disabled])'), 'Button is not disabled');
    await render(hbs`<Button @disabled={{true}} />`);
    assert.ok(find('button[disabled]'), 'Button is disabled');
  });
});
