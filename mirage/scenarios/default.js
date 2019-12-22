import ENV from '../../config/environment';
import emptyList from './empty-list';

const scenarios = {
  emptyList
}

const activeScenario = ENV.MIRAGE_SCENARIO;

export default function(server) {

  const scenario = scenarios[activeScenario];

  if (scenario) {
    scenario(server);
  }
  else {
    // category with items
    server.createList('item-category', 2).map(category => {
      server.createList('item', 3, {category});
    });
    // category without items
    server.createList('item-category', 1);
    // items without categories
    server.createList('item', 3);
  }
}
