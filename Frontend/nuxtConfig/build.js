/**
 * 빌드에 관련된 nuxt 옵션을 정리합니다.
 * 해당 옵션은 아래와 같습니다.
 * env, build,
 */
export default {
  // modern property https://ko.nuxtjs.org/docs/2.x/configuration-glossary/configuration-modern
  modern: false,
  /* env Setting */
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_APP_URL: process.env.BASE_APP_URL,
    BASE_I18N_LOCALE: process.env.BASE_I18N_LOCALE,
    BASE_I18N_FALLBACK_LOCALE: process.env.BASE_I18N_FALLBACK_LOCALE,
  },
  // public nuxt.context config variables
  publicRuntimeConfig: {
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_APP_URL: process.env.BASE_APP_URL,
    BASE_I18N_LOCALE: process.env.BASE_I18N_LOCALE,
    BASE_I18N_FALLBACK_LOCALE: process.env.BASE_I18N_FALLBACK_LOCALE,
  },
  // private nuxt.context config variables
  privateRuntimeConfig: {

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          'vl-style-icon': 'src',
        },
      },
      // for Antdv CustomTheme Setting
      less: {
        lessOptions: {
          javascriptEnabled: true,
          math: 'always',
        },
      },
    },
    devtool: true,
    analyze: true,
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxt/image',
  ],
  image: {
    staticFilename: '[publicPath]/images/[name]-[hash][ext]',
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 50,
          height: 50,
        },
      },
    },
  },
};
