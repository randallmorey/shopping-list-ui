import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupI18nMockService from '../../../helpers/mock-i18n';

module('Integration | Component | button/cancel', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    setupI18nMockService({
      actions: {
        default: {
          cancel: "Mock Cancel"
        }
      }
    });
  });

  test('it renders a non-submit button', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Cancel>Test</Button::Cancel>`);
    assert.ok(find('button:not([type="submit"])'), 'Button is not a submit');
  });

  test('it renders default content when no block', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Cancel />`);
    assert.equal(this.element.textContent.trim(), 'Mock Cancel');
  });

  test('it renders block content', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Cancel>Hello World</Button::Cancel>`);
    assert.equal(this.element.textContent.trim(), 'Hello World');
  });

  test('it supports a loading state', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Cancel @loading={{true}} />`);
    assert.ok(find('.is-loading'), 'Button has is-loading class');
  });

  test('it supports a disabled state', async function(assert) {
    assert.expect(2);
    await render(hbs`<Button::Cancel @disabled={{false}} />`);
    assert.notOk(find('[disabled]'), 'Button is not disabled');
    await render(hbs`<Button::Cancel @disabled={{true}} />`);
    assert.ok(find('[disabled]'), 'Button is disabled');
  });
});
