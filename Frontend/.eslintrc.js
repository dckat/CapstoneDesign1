module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'no-shadow': 0,
    'import/prefer-default-export': 0,
    'max-len': ['warn', { code: 200 }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      jsx: 'never',
      vue: 'never',
    }],
    indent: [2, 2],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.vue'],
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue', '.jsx'],
      },
      node: {
        extensions: ['.js', '.vue', '.jsx'],
      },
    },
  },
};
