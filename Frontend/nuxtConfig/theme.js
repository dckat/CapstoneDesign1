/**
 * 테마에 관련된 nuxt 옵션을 정리합니다.
 * 해당 옵션은 아래와 같습니다.
 * trainsition, css, loading
 */
import { resolve } from 'path';

export default {
// Theme Animation
  loading: {
    color: '#1890ff',
    height: '4px',
  },
  layoutTransition: {
    name: 'default-layout',
    mode: 'out-in',
  },
  pageTransition: {
    name: 'default-page',
    mode: 'out-in',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    resolve(__dirname, '../src/assets/styles/less/index'),
    resolve(__dirname, '../src/assets/styles/scss/index'),
  ],
};
