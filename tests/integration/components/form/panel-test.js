import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupI18nMockService from '../../../helpers/mock-i18n';

module('Integration | Component | form/panel', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    setupI18nMockService({
      actions: {
        default: {
          cancel: "Mock Cancel",
          save: "Mock Save"
        }
      }
    });
  });

  test('it renders', async function(assert) {
    await render(hbs`
      <Form::Panel as |form panel|>
        <panel.header as |header|>
          <form.cancel />
          <header.title>Title</header.title>
          <form.save />
        </panel.header>
        <panel.body>
          Body
        </panel.body>
      </Form::Panel>
    `);
    assert.ok(find('.section-panel'), 'Section panel renders');
    assert.ok(find('.form-panel'), 'Form panel renders');
    assert.ok(find('.button-cancel'), 'Cancel button renders');
    assert.ok(find('.button-save'), 'Save button renders');
    assert.equal(find('.section-panel-heading').textContent.trim(), 'Title');
    assert.equal(find('.section-panel-body').textContent.trim(), 'Body');
  });
});
