export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'finalProject',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [ "~/plugins/apollo-client.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'https://www.sandbox9.1sb.pp.ua/graphql/1',
    auth: {
      username: 'user',
      password: 'ovietiiwai4Ooyi'
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://www.sandbox9.1sb.pp.ua/graphql/1',
        httpLinkOptions: {
          headers: {
            Authorization: `Basic ${Buffer.from('user:ovietiiwai4Ooyi').toString('base64')}` 
          }
        } 
      }

    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
        name: 'products',
        path: '/products/:category+',
        component: resolve(__dirname, 'pages/products.vue')
        },
        {
          name: 'product-details',
          path: '/product/:slug',
          component: resolve(__dirname, 'pages/product/_slug.vue')
        }
      );
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}