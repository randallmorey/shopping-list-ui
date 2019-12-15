import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | active-pane', function(hooks) {
  setupTest(hooks);

  test('it defaults to sidebar', function(assert) {
    assert.expect(1);
    const service = this.owner.lookup('service:active-pane');
    assert.ok(service.isSidebar);
  });

  test('it can activate either sidebar or body', function(assert) {
    assert.expect(4);
    const service = this.owner.lookup('service:active-pane');
    service.activateBody();
    assert.notOk(service.isSidebar);
    assert.ok(service.isBody);
    service.activateSidebar();
    assert.ok(service.isSidebar);
    assert.notOk(service.isBody);
  });
});
