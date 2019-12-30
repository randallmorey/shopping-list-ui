export default function(server) {
  // category with items
  server.createList('item-category', 10).map(category => {
    server.createList('item', 3, {category});
  });
  // category without items
  server.createList('item-category', 1);
  // items without categories
  server.createList('item', 3);
  // stores
  server.createList('store', 5).map(store => {
    server.createList('store-item-category', 3, {storeProperty: store})
  });
}
