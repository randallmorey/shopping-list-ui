'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'Shopping List',
    short_name: 'Shopping List',
    description: 'An efficient shopping list for efficient people.',
    start_url: '/',
    display: 'fullscreen',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [],
    ms: {
      tileColor: '#fff'
    }
  };
}
