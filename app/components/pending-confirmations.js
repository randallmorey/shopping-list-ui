import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * A component that yields for each pending confirmation in the confirmations
 * service, passing the confirmation instance, a confirm action, and a dismiss
 * action. Useful for rendering confirm modals and awaiting user action.
 *
 * @augments Component
 *
 * @example
 *    <PendingConfirmations as |confirmation confirm dismiss|>
 *      <Confirm
 *          @headingText="Confirm Action"
 *          @confirmText="Yes"
 *          @dismissText="No"
 *          @confirmAction={{confirm}}
 *          @dismissAction={{dismiss}}>
 *        Are you sure?
 *      </Confirm>
 *    </PendingConfirmations>
 */
export default class PendingConfirmationsComponent extends Component {

  // =services

  @service confirmations;

  // =actions

  /**
   * Confirms the passed confirmation.
   * @param {Confirmation} confirmation
   */
  @action
  confirm(confirmation) {
    confirmation.confirm();
  }

  /**
   * Dismisses the passed confirmation.
   * @param {Confirmation} confirmation
   */
  @action
  dismiss(confirmation) {
    confirmation.dismiss();
  }

}
