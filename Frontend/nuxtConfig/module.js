/**
 * 모듈에 관련된 nuxt 옵션을 정리합니다.
 * 해당 옵션은 아래와 같습니다.
 * module, plugin, alias
 */
import { resolve } from 'path';

export default {
// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    resolve(__dirname, '../src/plugins/ApiClient/index'),
    resolve(__dirname, '../src/plugins/antDesign'),
    resolve(__dirname, '../src/plugins/Dayjs/index'),
    { src: '@/plugins/client-only.client.js' },
    { src: '@/plugins/globalMixins' },
    { src: '@/plugins/vuelayers.js', ssr: false },
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth-next',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-socket-io',
    'nuxt-leaflet',
    resolve(__dirname, '../src/modules/vuelayers.js'),
  ],
  // alias
  alias: {
    '@': resolve(__dirname, '../src/'),
    images: resolve(__dirname, '../src/assets/images'),
    styles: resolve(__dirname, '../src/assets/styles'),
  },
};
