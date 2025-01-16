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
  }

})