export default function(server) {
  server.createList('item-category', 1); // one empty category
  server.createList('item-category', 3).map(category => {
    server.createList('item', 3, {category});
  });
}
