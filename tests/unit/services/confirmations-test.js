import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | confirmations', function(hooks) {
  setupTest(hooks);

  test('`getConfirmation()` emits promise-like instances', function(assert) {
    assert.expect(3);
    const service = this.owner.lookup('service:confirmations');
    const confirmation = service.getConfirmation();
    assert.ok(confirmation.then, 'confirmation has a then method');
    assert.ok(confirmation.catch, 'confirmation has a catch method');
    assert.ok(confirmation.finally, 'confirmation has a finally method');
  });

  test('`pending` is an array of pending confirmations', function(assert) {
    assert.expect(3);
    const service = this.owner.lookup('service:confirmations');
    assert.equal(service.pending.length, 0, 'No pending confirmations yet');
    const confirmation = service.getConfirmation();
    assert.equal(service.pending.length, 1, 'One pending confirmation created');
    confirmation.confirm();
    assert.equal(service.pending.length, 0, 'Confirmation was confirmed');
  });

  test('confirmations may be confirmed or dismissed', function(assert) {
    assert.expect(4);
    const service = this.owner.lookup('service:confirmations');
    let confirmation = service.getConfirmation();
    assert.notOk(confirmation.done, 'Confirmation is pending');
    confirmation.confirm();
    assert.ok(confirmation.done, 'Confirmation is done via confirm');
    confirmation = service.getConfirmation();
    assert.notOk(confirmation.done, 'Confirmation is pending');
    confirmation.dismiss();
    assert.ok(confirmation.done, 'Confirmation is done via dismiss');
  });

  test('confirmations resolve on confirm', function(assert) {
    assert.expect(1);
    const service = this.owner.lookup('service:confirmations');
    const confirmation = service.getConfirmation();
    confirmation.then(() => assert.ok(true, 'Confirmation confirmed'));
    confirmation.confirm();
  });

  test('confirmations reject on dismiss', function(assert) {
    assert.expect(1);
    const service = this.owner.lookup('service:confirmations');
    const confirmation = service.getConfirmation();
    confirmation.catch(() => assert.ok(true, 'Confirmation dismissed'));
    confirmation.dismiss();
  });

  test('confirmations have a finally method', function(assert) {
    assert.expect(2);
    const service = this.owner.lookup('service:confirmations');
    let confirmation = service.getConfirmation();
    confirmation.finally(() => assert.ok(true, 'Confirmation finally called'));
    confirmation.confirm();
    confirmation = service.getConfirmation();
    confirmation.finally(() => assert.ok(true, 'Confirmation finally called'));
    confirmation.dismiss();
  });
});
