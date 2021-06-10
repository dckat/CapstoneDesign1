/* eslint-disable no-unused-vars */
import api from './nuxtConfig/api';
import build from './nuxtConfig/build';
import theme from './nuxtConfig/theme';
import nuxtConfigModule from './nuxtConfig/module';
import io from './nuxtConfig/ioConfig';
import extendRouter from './nuxtConfig/extendRouter';

// 설정 내용이 짧은 것 및 구조화 하기 애매한 것은 별도 파일로 관리하지 않음.
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'drone-web-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,
  // source Directory
  srcDir: 'src/',

  /* middleware */
  serverMiddleware: [
    './serverMiddleWare/index',
  ],
  router: {
    // router middleware
    middleware: 'router',
    // router extend
    // extendRoutes: extendRouter,
  },

  // module, plugin, alias, robots
  ...nuxtConfigModule,
  // axios, proxy, auth
  ...api,
  // env, runtimeConfig, build
  ...build,
  // loading, transition, css
  ...theme,

  // vue Global Config
  vue: {
    config: {
      productionTip: true,
      devtools: process.env.NODE_ENV === 'development',
      // silent: process.env.NODE_ENV !== 'development',
      // performance: process.env.NODE_ENV === 'development',
    },
  },

  // robots Setting
  robots: {
    UserAgent: '*',
    Disallow: '/',
  },
  // socket io Setting
  io,
};
