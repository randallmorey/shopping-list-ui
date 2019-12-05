import DatedModelFactory from './dated-model-factory';
import faker from 'faker';

export default DatedModelFactory.extend({
  name: faker.lorem.word
});
