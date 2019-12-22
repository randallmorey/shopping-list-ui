export default function(server) {
  // category with items
  server.createList('item-category', 2).map(category => {
    server.createList('item', 3, {category});
  });
  // category without items
  server.createList('item-category', 1);
  // items without categories
  server.createList('item', 3);
}
