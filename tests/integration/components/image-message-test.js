import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { textContent } from '../../helpers/text-content';

module('Integration | Component | image-message', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2)
    await render(hbs`
      <ImageMessage
        @src='images/item'
        @message='test message'
        >
      </ImageMessage>
    `);

    assert.equal(await textContent('p.image-message-text'), 'test message');
    assert.ok(find('svg.image-message-img'));
  });
});
