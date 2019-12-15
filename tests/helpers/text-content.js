import { find } from '@ember/test-helpers';

export function textContent(selector) {
  return find(selector).textContent.trim();
}
