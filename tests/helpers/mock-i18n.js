import service from './mock-service';
import { get } from '@ember/object';

export default (translations) => service('i18n', {

  translations,

  t(path) {
    return get(this.translations, path);
  }

});
