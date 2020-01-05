import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupI18nMockService from '../../../helpers/mock-i18n';

module('Integration | Component | button/done', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    setupI18nMockService({
      actions: {
        default: {
          done: "Mock Done"
        }
      }
    });
  });

  test('it renders a submit button', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Done>Test</Button::Done>`);
    assert.ok(find('button[type="submit"]'), 'Button is submit');
  });

  test('it renders default content when no block', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Done />`);
    assert.equal(this.element.textContent.trim(), 'Mock Done');
  });

  test('it renders block content', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Done>Hello World</Button::Done>`);
    assert.equal(this.element.textContent.trim(), 'Hello World');
  });

  test('it supports a loading state', async function(assert) {
    assert.expect(1);
    await render(hbs`<Button::Done @loading={{true}} />`);
    assert.ok(find('.is-loading'), 'Button has is-loading class');
  });

  test('it supports a disabled state', async function(assert) {
    assert.expect(2);
    await render(hbs`<Button::Done @disabled={{false}} />`);
    assert.notOk(find('[disabled]'), 'Button is not disabled');
    await render(hbs`<Button::Done @disabled={{true}} />`);
    assert.ok(find('[disabled]'), 'Button is disabled');
  });
});
