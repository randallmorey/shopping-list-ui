import DatedModelFactory from './dated-model-factory';
import faker from 'faker';
import { capitalize } from '@ember/string';

export default DatedModelFactory.extend({
  name: () => capitalize(faker.lorem.word())
});
