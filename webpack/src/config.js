require('babel-polyfill')

const environment = {
  development: {
    isProduction: false,
    openBrowserAfterBuild: false,
    host: 'localhost',
  },
  production: {
    isProduction: true,
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  port: process.env.PORT,
}, environment)
