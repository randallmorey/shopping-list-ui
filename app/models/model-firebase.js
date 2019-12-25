import Model from '@ember-data/model';

export default class ModelFirebaseModel extends Model {

  /**
   * Conditionally reload the record to get full firebase normalization,
   * which doesn't happen for all request types (even though it is supposed to).
   */
  save() {
    return super.save(...arguments)
      .then(record => {
        // This is a hack to make firebase fully normalize a record, which
        // it doesn't do for all request types, but will do for GET.
        if (!record.isDeleted) {
          return record.reload();
        } else {
          return record;
        }
      });
  }
}
