import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupI18nMockService from '../../../helpers/mock-i18n';

module('Integration | Component | link/home', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    setupI18nMockService({
      resources: {
        home: "Mock Home"
      }
    });
  });

  test('it renders', async function(assert) {
    assert.expect(2)
    await render(hbs`
      <Link::Home />
    `);

    assert.equal(this.element.textContent.trim(), 'Mock Home');
    assert.ok(find('.link-home'))
  });
});
