import Mixin from '@ember/object/mixin';
import { action } from '@ember/object';

export default Mixin.create({
  /**
   * Requests abandon confirmation from user if record has changes.
   * @param {Transition} transition
   */
  @action
  willTransition(transition) {
    this.send('confirmAbandon', this.currentModel, transition);
  }
});
