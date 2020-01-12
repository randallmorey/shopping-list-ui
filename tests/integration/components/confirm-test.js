import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { textContent } from '../../helpers/text-content';

module('Integration | Component | confirm', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);
    this.set('dismiss', () => {});
    this.set('confirm', () => {});
    await render(hbs`
      <Confirm
        @headingText='Confirm'
        @dismissText='No'
        @confirmText='Yes'
        @dismissAction={{this.dismiss}}
        @confirmAction={{this.confirm}}>
        Are you sure?
      </Confirm>
    `);
    assert.equal(textContent('#confirm-header'), 'Confirm');
    assert.equal(textContent('#confirm-body'), 'Are you sure?');
    assert.equal(textContent('.confirm-button-safe'), 'No');
    assert.equal(textContent('.confirm-button-unsafe'), 'Yes');
  });

  test('it can trigger dismiss and confirm actions', async function(assert) {
    assert.expect(2);
    this.set('dismiss', () => {
      assert.ok(true, 'Dismiss was called');
    });
    this.set('confirm', () => {
      assert.ok(true, 'Confirm was called');
    });
    await render(hbs`
      <Confirm
        @dismissAction={{this.dismiss}}
        @confirmAction={{this.confirm}}>
        Are you sure?
      </Confirm>
    `);
    await click('.confirm-button-safe');
    await click('.confirm-button-unsafe');
  });
});
