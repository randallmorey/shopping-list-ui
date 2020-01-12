import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupI18nMockService from '../../../helpers/mock-i18n';

module('Integration | Component | button/delete', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    setupI18nMockService({
      actions: {
        default: {
          delete: "Mock Delete"
        }
      }
    });
  });

  test('it renders a non-submit button', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Delete>Test</Button::Delete>`);
    assert.ok(find('button:not([type="submit"])'), 'Button is not a submit');
  });

  test('it renders default content when no block', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Delete />`);
    assert.equal(this.element.textContent.trim(), 'Mock Delete');
  });

  test('it renders block content', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Delete>Hello World</Button::Delete>`);
    assert.equal(this.element.textContent.trim(), 'Hello World');
  });

  test('it supports a loading state', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Delete @loading={{true}} />`);
    assert.ok(find('.is-loading'), 'Button has is-loading class');
  });

  test('it supports a disabled state', async function(assert) {
    assert.expect(2);
    await render(hbs`<Button::Delete @disabled={{false}} />`);
    assert.notOk(find('[disabled]'), 'Button is not disabled');
    await render(hbs`<Button::Delete @disabled={{true}} />`);
    assert.ok(find('[disabled]'), 'Button is disabled');
  });
});
