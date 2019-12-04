import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  dateCreated: faker.date.past,
  dateUpdated: faker.date.past
});
