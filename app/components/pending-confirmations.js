import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class PendingConfirmationsComponent extends Component {
  @service confirmations;

  @action
  confirm(confirmation) {
    confirmation.confirm();
  }

  @action
  dismiss(confirmation) {
    confirmation.dismiss();
  }

}
