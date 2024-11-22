// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@unocss/nuxt', '@nuxt/ui', 'nuxt-lucide-icons'],

  // Fix warning about scss
  vite: { css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } } }

})