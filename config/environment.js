'use strict';

const useFirebase = (process.env.USE_FIREBASE) ?
      JSON.parse(process.env.USE_FIREBASE) : true;

const firebaseConfig = (process.env.FIREBASE_CONFIG_JSON) ?
      JSON.parse(process.env.FIREBASE_CONFIG_JSON) :
      {
        apiKey: "AIzaSyC4Aglp5xJiWZt-yZBf5SoxfwcNGOygghQ",
        authDomain: "shopping-list-developmen-5cde7.firebaseapp.com",
        databaseURL: "https://shopping-list-developmen-5cde7.firebaseio.com",
        projectId: "shopping-list-developmen-5cde7",
        storageBucket: "shopping-list-developmen-5cde7.appspot.com",
        messagingSenderId: "263121214343",
        appId: "1:263121214343:web:408fbb1622407ce4c45122"
      };

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'shopping-list-ui',
    environment,
    rootURL: '/',
    locationType: 'auto',
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
    },

    useFirebase,
    firebase: useFirebase ? firebaseConfig : null,

    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicyMeta: true,
    contentSecurityPolicy: {
      'default-src': ["'none'"],
      'script-src':  ["'self'"],
      'frame-src':   [
        "'self'",
        `https://${firebaseConfig.projectId}.firebaseapp.com`
      ],
      'font-src':    ["'self'"],
      'connect-src': ["'self'"],
      'img-src':     ["'self'"],
      'style-src':   ["'self'", "'unsafe-inline'"],
      'media-src':   ["'self'"]
    }
  };

  // Unsafe script eval and inline is necessary in
  // development and test environments
  const enableUnsafeCSP = () => {
    ENV.contentSecurityPolicy['script-src'].push("'unsafe-eval'");
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // disable firebase for tests
    ENV.useFirebase = false;

    enableUnsafeCSP();
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    // disable firebase for tests
    ENV.useFirebase = false;

    // CSP will break test coverage, so it is disabled
    ENV.contentSecurityPolicyMeta = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
