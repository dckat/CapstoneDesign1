import { version } from '../package.json';

/**
 * api 관련된 nuxt 옵션을 정리합니다.
 * 해당 옵션은 아래와 같습니다.
 * auth, axios, proxy,
 */
export default {
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    retry: { retries: 3 },
    // baseUrl: 'http://localhost:5555',
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        AppVersion: version,
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {},
    },
  },
  proxy: {
    '/api': {
      target: process.env.BASE_API_URL || 'http://14.33.35.148:20205',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    },
  },
  auth: {
    // Options
  },
};
