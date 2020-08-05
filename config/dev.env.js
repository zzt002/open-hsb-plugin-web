'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const Vue = require('Vue')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: Vue.prototype.baseUrl + ':9999/',
})
