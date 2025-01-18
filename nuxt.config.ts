// https://nuxt.com/docs/api/configuration/nuxt-config
import 'dotenv/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: false,

  modules: ['@unocss/nuxt', 'nuxt-auth-utils', '@nuxt/icon', '@vueuse/nuxt'],

  // Fix warning about scss
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },

  icon: {
    componentName: 'NuxtIcon'
  },

  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
    LOADED_MESSAGE: process.env.LOADED_MESSAGE,

    session: {
      password: process.env.NUXT_SESSION_PASSWORD || ''
    },

    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET
      }
    }
  },

})