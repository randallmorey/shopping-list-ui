import { modifier } from "ember-modifier";

/**
 * Calls focus() on the passed DOM element.
 */
export default modifier(element => element.focus());
