'use strict';

// Create mirage scenario variable
const { MIRAGE_SCENARIO } = process.env;

// While a firebase config is always required, for safety it is disabled
// by default, except in production when it is enabled by default.
const useFirebase = (process.env.USE_FIREBASE) ?
      JSON.parse(process.env.USE_FIREBASE) : false;

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

    MIRAGE_SCENARIO,

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    useFirebase,
    firebase: firebaseConfig,

    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicyMeta: true,
    contentSecurityPolicy: {
      'default-src': ["'none'"],
      'script-src':  ["'self'"],
      'frame-src':   ["'self'"],
      'font-src':    ["'self'"],
      'connect-src': ["'self'"],
      'img-src':     ["'self'"],
      'style-src':   ["'self'"],
      'media-src':   ["'self'"]
    },

    i18nextOptions: {
      lowerCaseLng: true,
      fallbackLng: 'en-se',
      whitelist: ['en-se']
    }
  };

  // Firebase requires access to certain Google domains
  const enableFirebaseCSP = () => {
    ENV.contentSecurityPolicy['connect-src']
      .push('https://firestore.googleapis.com');
    ENV.contentSecurityPolicy['frame-src']
      .push(`https://${firebaseConfig.projectId}.firebaseapp.com`);
  };

  // Unsafe script eval and inline is necessary in
  // development and test environments
  const enableUnsafeCSP = () => {
    ENV.contentSecurityPolicy['script-src'].push("'unsafe-eval'");
    ENV.contentSecurityPolicy['style-src'].push("'unsafe-inline'");
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-a11y-testing'] = {
      componentOptions: {
        axeOptions: {
          checks: {
            'color-contrast': {options: {noScroll: true}}
          }
        }
      }
    };

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

    // CSP will break test coverage, so it is disabled
    ENV.contentSecurityPolicyMeta = false;

    ENV.useFirebase = false;
  }

  if (environment === 'production') {
    ENV.useFirebase = (process.env.USE_FIREBASE) ?
      JSON.parse(process.env.USE_FIREBASE) : true;
  }

  // When enabled for any environment, Firebase requires Mirage to be
  // disabled and certain CSP directives to be added.
  if (ENV.useFirebase) {
    ENV['ember-cli-mirage'] = {enabled: false};
    enableFirebaseCSP();
  }

  return ENV;
};
