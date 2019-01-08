const pkg = require('./package')

import webpack from 'webpack'

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */

  loading: { color: '#fff' },


  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/style.css',
    '~/assets/sass/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
  }),
    {src: '~plugins/vuelidate.js'},
    {src: '~plugins/filters.js'},
    {src: '~plugins/axios.js'}
  ],

  /*
  ** Middleware to run between routes
  **
  */
 router: {
  middleware: ['routeChange'],
},

  /*
  ** Nuxt.js modules
  */
  modules: [

    // Doc: https://github.com/nuxt-community/axios-module#usage

    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'vuelidate'
    ]
  },
  env: {
    baseURL: process.env.baseURL || 'http://localhost:3030'
  }
}
