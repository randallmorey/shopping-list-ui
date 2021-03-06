export default function() {
  this.passthrough();

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.get('/items');
  this.post('/items');
  this.get('/items/:id');
  this.patch('/items/:id');
  this.put('/items/:id');
  this.del('/items/:id');

  this.get('/item-categories');
  this.post('/item-categories');
  this.get('/item-categories/:id');
  this.patch('/item-categories/:id');
  this.put('/item-categories/:id');
  this.del('/item-categories/:id');

  this.get('/stores');
  this.post('/stores');
  this.get('/stores/:id');
  this.post('/stores/:id');
  this.patch('/stores/:id');
  this.put('/stores/:id');
  this.del('/stores/:id');

  this.get('/store-item-categories');
  this.post('/store-item-categories');
  this.get('/store-item-categories/:id');
  this.patch('/store-item-categories/:id');
  this.put('/store-item-categories/:id');
  this.del('/store-item-categories/:id');

  this.get('/shopping-lists');
  this.post('/shopping-lists');
  this.get('/shopping-lists/:id');
  this.patch('/shopping-lists/:id');
  this.put('/shopping-lists/:id');
  this.del('/shopping-lists/:id');

  this.get('/shopping-list-items');
  this.post('/shopping-list-items');
  this.get('/shopping-list-items/:id');
  this.post('/shopping-list-items/:id');
  this.patch('/shopping-list-items/:id');
  this.put('/shopping-list-items/:id');
  this.del('/shopping-list-items/:id');

}
