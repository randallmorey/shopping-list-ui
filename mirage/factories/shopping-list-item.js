import DatedModelFactory from './dated-model-factory';
import faker from 'faker';

export default DatedModelFactory.extend({
  quantity: faker.random.number,
  notes: faker.random.words,
  purchased: faker.random.boolean
});
