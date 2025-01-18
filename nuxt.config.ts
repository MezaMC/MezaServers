// https://nuxt.com/docs/api/configuration/nuxt-config
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
    NUXT_SESSION_PASSWORD: process.env.NUXT_SESSION_PASSWORD,
    NUXT_OAUTH_GITHUB_CLIENT_ID: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
    NUXT_OAUTH_GITHUB_CLIENT_SECRET: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET
  }

})