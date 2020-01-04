import DatedModelFactory from './dated-model-factory';
import faker from 'faker';

export default DatedModelFactory.extend({
  quantity: () => Math.random() > 0.25 ? faker.random.number(10) : 0,
  notes: faker.random.words,
  purchased: faker.random.boolean
});
