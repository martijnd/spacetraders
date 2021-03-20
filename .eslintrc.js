module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript',
    '@vue/typescript/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    // vue/no-unused-vars: error,
    'semi': 1,
    'no-console': 1,
    'vue/comment-directive': 0,
    'quotes': ['warn', 'single'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': true,
      'ignores': []
    }]
  },
};
