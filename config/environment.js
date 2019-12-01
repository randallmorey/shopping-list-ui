'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'shopping-list-ui',
    environment,
    rootURL: '/',
    locationType: 'auto',
    firebase: {
      apiKey: "AIzaSyC4Aglp5xJiWZt-yZBf5SoxfwcNGOygghQ",
      authDomain: "shopping-list-developmen-5cde7.firebaseapp.com",
      databaseURL: "https://shopping-list-developmen-5cde7.firebaseio.com",
      projectId: "shopping-list-developmen-5cde7",
      storageBucket: "shopping-list-developmen-5cde7.appspot.com",
      messagingSenderId: "263121214343",
      appId: "1:263121214343:web:408fbb1622407ce4c45122"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_MODULE_UNIFICATION: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
