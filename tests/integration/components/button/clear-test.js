import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupI18nMockService from '../../../helpers/mock-i18n';

module('Integration | Component | button/clear', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    setupI18nMockService({
      actions: {
        default: {
          clear: "Mock Clear"
        }
      }
    });
  });

  test('it renders a non-submit button', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Clear>Test</Button::Clear>`);
    assert.ok(find('button[type="submit"]'), 'Button is a submit');
  });

  test('it renders default content when no block', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Clear />`);
    assert.equal(this.element.textContent.trim(), 'Mock Clear');
  });

  test('it renders block content', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Clear>Hello World</Button::Clear>`);
    assert.equal(this.element.textContent.trim(), 'Hello World');
  });

  test('it supports a loading state', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Clear @loading={{true}} />`);
    assert.ok(find('.is-loading'), 'Button has is-loading class');
  });

  test('it supports a disabled state', async function(assert) {
    assert.expect(2);
    await render(hbs`<Button::Clear @disabled={{false}} />`);
    assert.notOk(find('[disabled]'), 'Button is not disabled');
    await render(hbs`<Button::Clear @disabled={{true}} />`);
    assert.ok(find('[disabled]'), 'Button is disabled');
  });
});
