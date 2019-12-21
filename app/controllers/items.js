import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

/**
 * Exposes the active pane service to the context.
 */
export default class ItemsController extends Controller {

  // = services

  @service activePane;

}