module.exports = {
  root: true,
  extends: "vue",     //支持vue语法
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
  },
}
