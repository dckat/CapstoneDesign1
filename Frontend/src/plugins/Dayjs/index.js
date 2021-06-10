import Vue from 'vue';
import dayjs from './partials/implement';

const options = {
  // locale: process.env.VUE_APP_I18N_LOCALE || 'ko',
  locale: 'ko',
  localeObject: {
    name: 'ko',
    weekdays: ['월', '화', '수', '목', '금', '토', '일'],
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    formats: {
      L: 'YYYY-MM-DD',
      LL: 'YYYY-MM-DD(ddd)',
      LLL: 'YYYY-MM-DD HH:mm',
      LLLL: 'YYYY-MM-DD HH:mm:sss',
    },
  },
};

Vue.use(dayjs, options);
Vue.filter('dayjs', (value, format) => {
  if (value == null || format == null || value === 'Invalid Date') {
    return '';
  }
  return dayjs.day(value).format(format);
});
