module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  rules: {
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'getter-return': 'off',
    'no-console': 'off',
    'no-debugger': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
