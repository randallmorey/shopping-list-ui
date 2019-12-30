import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('items', function() {
    this.route('item', {path: ':item_id'}, function () {
      this.route('categories', function() {
        this.route('category', {path: ':category_id'});
        this.route('new');
      });
    });
    this.route('new');
  });
  this.route('stores', function() {
    this.route('store', {path: ':store_id'});
  });
});
