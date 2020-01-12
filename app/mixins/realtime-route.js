import Mixin from '@ember/object/mixin';
import { subscribe as firebaseSubscribe,
         unsubscribe as firebaseUnsubscribe } from
         '../services/realtime-listener';
import config from '../config/environment';

/* istanbul ignore next  */
const subscribe = config.useFirebase ?
  firebaseSubscribe :
  () => {};

/* istanbul ignore next  */
const unsubscribe = config.useFirebase ?
  firebaseUnsubscribe :
  () => {};

export default Mixin.create({ // eslint-disable-line ember/no-new-mixins

  /**
   * Subscribes to Firebase realtime updates or no-op if Firebase is inactive.
   */
  subscribe(model) {
    subscribe(this, model);
    return this._super(...arguments);
  },

  /**
   * Unsubscribes to Firebase realtime updates or no-op if Firebase is inactive.
   */
  deactivate() {
    unsubscribe(this);
    return this._super(...arguments);
  }

});
