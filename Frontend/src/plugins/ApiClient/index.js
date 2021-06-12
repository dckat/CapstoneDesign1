/* eslint-disable func-names,no-param-reassign */
import store from 'store2';
import { Modal } from 'ant-design-vue';

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    /* header AppVersion 체크 */
    if (!store.get('appVersion')) {
      store.set('appVersion', config.headers.common.AppVersion);
    } else if (config.headers.common.AppVersion !== store.get('appVersion')) {
      store.set('appVersion', config.headers.common.AppVersion);
      Modal.info({
        title: '새로운 콘텐츠가 감지되었습니다.',
        content: '확인을 눌러 새로고침 해주세요.',
        onOk: () => {
          window.location.reload(true);
        },
      });
    }
    return config;
  });
  $axios.onResponse((response) => response.data);
  $axios.onError((error) => {
    if (error.response.status === 404) {
      redirect('/auth/404');
    } else {
      Modal.error({
        title: '서버와의 통신에 에러가 발생했습니다.',
        onOk: () => {
          redirect('/auth/500');
        },
      });
    }
  });
}
