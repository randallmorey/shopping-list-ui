import { helper } from '@ember/component/helper';
import getSlug from 'speakingurl';

/**
 * Returns a slug from a string.
 * @function slugify
 * @example
 * {{slugify "Foo bar"}}
 */
export default helper(function slugify(params/*, hash*/) {
  const string = params[0].replace(/'/g, '');
  return getSlug(string);
});
