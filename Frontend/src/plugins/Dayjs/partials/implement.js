/* eslint-disable no-param-reassign */
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export default {
  install(Vue, options) {
    dayjs.locale(options.locale, options.localeObject);
    Vue.prototype.$dayjs = dayjs;
  },
};

export const day = dayjs;
