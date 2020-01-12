//import random from '../helpers/random';

export default function(server) {

  // items *without* categories
  server.createList('item', 3);
  // category *without* items
  server.createList('item-category', 1);
  // item categories
  server.createList('item-category', 5).map(category =>
    server.createList('item', 2, {category})
  );

  const allItemCategories = server.schema.itemCategories.all().models;

  // stores
  server.createList('store', 5).map(storeProperty => {
    allItemCategories.map(itemCategory => {
      server.create('store-item-category', {storeProperty, itemCategory});
    });
  });

}
