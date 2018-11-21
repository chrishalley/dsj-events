const pkg = require('./package')

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
<<<<<<< HEAD
  loading: { color: '#fff' },
=======
  loading: { color: '#FFFFFF' },
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/style.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
<<<<<<< HEAD
=======
    '~plugins/firebase.js',
    '~plugins/fireauth.js',
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
    '~plugins/vuelidate.js',
    '~plugins/filters.js'
  ],

  /*
  ** Middleware to run between routes
  */
 router: {
<<<<<<< HEAD
  middleware: ['router-auth']
},
=======
   middleware: ['router-auth']
 },
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253

  /*
  ** Nuxt.js modules
  */
  modules: [
<<<<<<< HEAD
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
=======
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/axios-module#usage
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
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
<<<<<<< HEAD
=======
      'firebase',
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
      'vuelidate'
    ]
  },
  env: {
<<<<<<< HEAD
    baseURL: 'http://localhost:3030',
=======
    baseURL: 'https://dsj-events-app.firebaseio.com/',
    fbAPIKey: 'AIzaSyAtV5Wa4T0r3b7iQDUDd4nTLjiK3E3JywA'
>>>>>>> af947747d0c74314b6292d20c0f5282a228dd253
  }
}
