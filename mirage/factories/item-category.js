import DatedModelFactory from './dated-model-factory';

export default DatedModelFactory.extend({
  name: i => `Item Category ${i + 1}`
});
