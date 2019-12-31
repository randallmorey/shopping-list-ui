import random from '../helpers/random';

export default function(server) {
  // stores
  const stores = server.createList('store', 5)

  // item category with items and store item category
  server.createList('item-category', 5).map(category => {
    server.createList('store-item-category', 1,
      {storeProperty: random(stores), storeItemCategory: category })
    server.createList('item', 2, {category})
  });

  // store item category without item category
  for (let i = 0; i < 4; i++) {
    server.create('store-item-category', 1, {storeProperty: random(stores)})
  }
  // category without items
  server.createList('item-category', 1);
  // items without categories
  server.createList('item', 3);

}
