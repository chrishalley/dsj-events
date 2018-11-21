module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
<<<<<<< HEAD
    'plugin:vue/essential'
=======
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
<<<<<<< HEAD
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
=======
  rules: {}
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
}
