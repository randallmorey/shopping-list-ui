import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pending-confirmations', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<PendingConfirmations />`);

    assert.equal('a', 'a');

    // Template block usage:
    await render(hbs`
      <PendingConfirmations>
        template block text
      </PendingConfirmations>
    `);

    assert.equal('b', 'b');
  });
});
