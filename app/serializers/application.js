import ApplicationFirebaseSerializer from './application-firebase';
import ApplicationJSONAPISerializer from './application-json-api';
import config from '../config/environment';

// This if statement is ignored by coverage, since only one serializer can
// be used at a time.  However, as the two possible serializers have their own
// independent unit tests, they are still fully covered.
/* istanbul ignore next  */
const BaseSerializer = config.useFirebase ?
  ApplicationFirebaseSerializer :
  ApplicationJSONAPISerializer;

/**
 * This default serializer typically extends `ApplicationFirebaseSerializer`.
 * However, this can be swapped at build time for a standard JSON API
 * serializer, which is useful for local development and testing with mock data.
 *
 * @class ApplicationSerializer
 * @augments {ApplicationFirebaseSerializer|ApplicationJSONAPISerializer}
 */
export default class ApplicationSerializer extends BaseSerializer {}
