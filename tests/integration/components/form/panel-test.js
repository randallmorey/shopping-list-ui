import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupI18nMockService from '../../../helpers/mock-i18n';

module('Integration | Component | form/panel', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    setupI18nMockService({
      actions: {
        default: {
          save: "Mock Save",
          cancel: "Mock Cancel",
          delete: "Mock Delete"
        }
      }
    });
  });

  test('it renders', async function(assert) {
    assert.expect(7);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @title="Title" @cancel={{this.noop}} as |form|>
        <form.delete />
        <div class="test">Body</div>
      </Form::Panel>
    `);
    assert.ok(find('section.section-panel'), 'Section panel renders');
    assert.ok(find('form.form-panel'), 'Form panel renders');
    assert.ok(find('button.button-save'), 'Save button renders');
    assert.ok(find('button.button-cancel'), 'Cancel button renders');
    assert.ok(find('button.button-delete'), 'Delete button renders');
    assert.equal(find('h1.section-panel-heading').textContent.trim(), 'Title');
    assert.equal(find('.section-panel-body .test').textContent.trim(), 'Body');
  });

  test('save button triggers form submit', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    this.submit = () => assert.ok(true, 'submit was called');
    await render(hbs`
      <Form::Panel
        @cancel={{this.noop}}
        @dirty={{true}}
        {{action this.submit on="submit"}} />
    `);
    await click('.button-save');
  });

  test('cancel button calls cancel function', async function(assert) {
    assert.expect(1);
    this.cancel = () => assert.ok(true, 'cancel was called');
    await render(hbs`
      <Form::Panel @cancel={{this.cancel}} />
    `);
    await click('.button-cancel');
  });

  test('save button is enabled when form is in dirty state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @dirty={{true}} />
    `);
    await assert.ok(find('.button-save:not([disabled])'), 'save is enabled');
  });

  test('save button is loading when form is in saving state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @saving={{true}} />
    `);
    await assert.ok(find('.button-save.is-loading'), 'save is loading');
  });

  test('save button is not loading when form is not in saving state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @saving={{false}} />
    `);
    await assert.ok(find('.button-save:not(.is-loading)'), 'save is not loading');
  });

  test('save button is enabled when form is in dirty state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @dirty={{true}} />
    `);
    await assert.ok(find('.button-save:not([disabled])'), 'save is enabled');
  });

  test('cancel button is enabled when form is not in saving state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @saving={{false}} />
    `);
    await assert.ok(find('.button-cancel:not([disabled])'), 'cancel is enabled');
  });

  test('cancel button is disabled when form is in saving state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @saving={{true}} />
    `);
    await assert.ok(find('.button-cancel[disabled]'), 'cancel is disabled');
  });

  test('delete button is enabled when form is not in dirty state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @dirty={{false}} as |form|>
        <form.delete />
      </Form::Panel>
    `);
    await assert.ok(find('.button-delete:not([disabled])'), 'delete is enabled');
  });

  test('delete button is loading when form is in saving state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @saving={{true}} as |form|>
        <form.delete />
      </Form::Panel>
    `);
    await assert.ok(find('.button-delete.is-loading'), 'delete is loading');
  });

  test('delete button is not loading when form is not in saving state', async function(assert) {
    assert.expect(1);
    this.noop = () => {};
    await render(hbs`
      <Form::Panel @cancel={{this.noop}} @saving={{false}} as |form|>
        <form.delete />
      </Form::Panel>
    `);
    await assert.ok(find('.button-delete:not(.is-loading)'), 'delete is not loading');
  });

});
