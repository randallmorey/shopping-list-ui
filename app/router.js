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
    this.route('new');
  });
  this.route('shopping-lists', {path: 'lists'}, function() {
    this.route('shopping-list', {path: ':shopping_list_id'}, function() {
      this.route('shopping-list-items', {path: 'items'}, function() {
        this.route('shopping-list-item', {path: ':shopping_list_item_id'});
      });
      this.route('shop');
    });
  });

  this.route('list', function() {
    this.route('manage', function() {
      this.route('item', {path: ':item_id'});
    });
  });
});
