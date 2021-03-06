import DatedModelFactory from './dated-model-factory';
import faker from 'faker';

export default DatedModelFactory.extend({
  name: () => faker.company.companyName(),
  location: () => faker.address.streetAddress()
});
