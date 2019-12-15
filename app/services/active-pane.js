import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { equal } from '@ember/object/computed';

/**
 * A purpose-built pane-activation service that tracks the currently active
 * pane for layouts.  Since only one pane may be visible at a time in small
 * screens, this is useful for routes wishing to specify the active pane.
 *
 * @example
 *    activePane.activateSidebar();
 *    activePane.activateBody();
 *
 * @example
 *    <layout.pane @active={{if activePane.isSidebar}}>…</layout.pane>
 */
export default class ActivePaneService extends Service {

  // =properties

  /**
   * The name of the active layout pane.
   * @type {String}
   */
  @tracked
  activePane = 'sidebar';

  /**
   * True if the active pane is `sidebar`.
   * @type {Boolean}
   */
  @equal('activePane', 'sidebar')
  isSidebar;

  /**
   * True if the active pane is `body`.
   * @type {Boolean}
   */
  @equal('activePane', 'body')
  isBody;

  // =methods

  /**
   * Sets the active pane to `sidebar`.
   */
  activateSidebar() {
    this.activePane = 'sidebar';
  }

  /**
   * Sets the active pane to `body`.
   */
  activateBody() {
    this.activePane = 'body';
  }

}
