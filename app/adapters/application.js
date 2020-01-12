import ApplicationFirebaseAdapter from './application-firebase';
import ApplicationJSONAPIAdapter from './application-json-api';
import config from '../config/environment';

// This if statement is ignored by coverage, since only one adapter can
// be used at a time.
/* istanbul ignore next  */
const BaseAdapter = config.useFirebase ?
  ApplicationFirebaseAdapter :
  ApplicationJSONAPIAdapter;

/**
 * @class ApplicationAdapter
 * @augments {ApplicationFirebaseAdapter|ApplicationJSONAPIAdapter}
 */
export default class ApplicationAdapter extends BaseAdapter {}
