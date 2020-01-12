import DatedModelFactory from './dated-model-factory';
import faker from 'faker';
import { capitalize } from '@ember/string';

export default DatedModelFactory.extend({
  name: () => capitalize(faker.commerce.productName()),
  quantity: () => Math.random() > 0.25 ? faker.random.number(10) : 0,
  notes: () => (faker.commerce.productAdjective() + ' ' + faker.commerce.productMaterial()),
  purchased: faker.random.boolean
});
