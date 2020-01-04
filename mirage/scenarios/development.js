//import random from '../helpers/random';

export default function(server) {

  // shopping list
  const list = server.create('shopping-list');
  // shopping list item *without* inverse item
  server.create('shopping-list-item', {list});

  // items *without* categories
  server.createList('item', 3).map(item =>
    server.create('shopping-list-item', {item, list})
  );
  // category *without* items
  server.createList('item-category', 1);
  // item categories
  server.createList('item-category', 5).map(category =>
    server.createList('item', 2, {category})
  );

  const allItemCategories = server.schema.itemCategories.all().models;

  // stores
  server.createList('store', 5).map(storeProperty => {
    // store item categories *with* item categories
    for (let i = 0; i < 3; i++) {
      server.create('store-item-category', {
        storeProperty,
        itemCategory: allItemCategories[i + 1]
      });
    }
    // store item categories *without* item categories
    server.createList('store-item-category', 3, {storeProperty});
  });

}
