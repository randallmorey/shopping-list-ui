import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { defer } from 'rsvp';
import { filterBy } from '@ember/object/computed';

/**
 * A simple service that emits Confirmation instances and
 * exposes a `pending` property to discover pending
 * confirmations.
 * @augments Service
 *
 * @example
 *    const confirmation = confirmationService.getConfirmation();
 */
export default class ConfirmationsService extends Service {

  // =properties

  /**
   * @type {Array}
   */
  confirmations = A();

  /**
   * An array of pending confirmations (those where `done === false`).
   * @type {Array}
   */
  @filterBy('confirmations', 'done', false)
  pending;

  // =methods

  /**
   * Creates a new confirmation, passing it the specified `type`,
   * and adds the confirmation to an internal array `confirmations`.
   * @param {String} type  An optional type annotation for convenience.
   *    Has no effect on confirmation.
   * @returns {Confirmation}
   */
  getConfirmation(type) {
    const confirmation = new Confirmation(type);
    this.confirmations.addObject(confirmation);
    return confirmation;
  }

}

/**
 * A promise-like object that is either "confirmed" or "dismissed", represented
 * internally by a promise that resolves or rejects.  Confirmations may be used
 * as promises via `then`, `catch`, and `finally`.
 *
 * Not intended for instantiation directly.  Use the confirmation service
 * to create confirmation instances.
 *
 * @example
 *    const confirmation = new Confirmation();
 *    confirmation.confirm();
 *    // confirmation.done now equals true
 *    confirmation
 *      .then(() => { }) // do something
 *      .catch(() => { }) // not called, since the confirmation is confirmed
 *      .finally(() => { });   // do something
 *
 * @example
 *    const confirmation = new Confirmation();
 *    confirmation.dismiss();
 *    // confirmation.done now equals true
 *    confirmation
 *      .then(() => { }) // not called, since the confirmation is dismissed
 *      .catch(() => { }) // do something
 *      .finally(() => { });   // do something
 */
class Confirmation {

  // =properties

  /**
   * Indicates whether the confirmation has been confirmed or dismissed.
   * Automatically set to `true` after `confirm` or `dismiss` are called.
   * @type {Boolean}
   */
  @tracked done = false;

  /**
   * Sets the type field to the specified type and sets up a defer.
   * @param {String} type  An optional type annotation for convenience.
   *    Has no effect on confirmation.
   */
  constructor(type) {
    this.type = type;
    this.deferred = defer();
  }

  /**
   * Sets the confirmation to done and resolves the defer.
   */
  confirm() {
    this.done = true;
    this.deferred.resolve();
  }

  /**
   * Sets the confirmation to done and rejects the defer.
   */
  dismiss() {
    this.done = true;
    this.deferred.reject();
  }

  /**
   * Delegates to the internal defer promise, allowing the
   * confirmation to be treated like a promise.
   */
  then() {
    return this.deferred.promise.then(...arguments);
  }

  /**
   * Delegates to the internal defer promise, allowing the
   * confirmation to be treated like a promise.
   */
  catch() {
    return this.deferred.promise.catch(...arguments);
  }

  /**
   * Delegates to the internal defer promise, allowing the
   * confirmation to be treated like a promise.
   */
  finally() {
    return this.deferred.promise.finally(...arguments);
  }

}
