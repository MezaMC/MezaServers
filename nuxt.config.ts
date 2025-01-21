// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@unocss/nuxt',
    'nuxt-auth-utils',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    'nuxt-seo-utils',
  ],

  site: {
    name: 'MezaServers',
    url: 'servers.meza.one',
  },

  // Rendering options
  ssr: false,
  routeRules: {
    "/adding-server": { static: true },
    "/about": { static: true },
    "/faq": { static: true },
  },

  // Seo meta
  seo: {
    enabled: true,
    meta: {
      creator: "envizar",
      description: "Современный мониторинг мистических Minecraft серверов",

      ogTitle: "MezaServers",
      ogDescription: "Современный мониторинг мистических Minecraft серверов",
      ogLocale: "ru_RU",
      ogImage: "https://servers.meza.one/logo.png",
      ogType: "website"
    }
  },

  // Fix warning about scss
  vite: {
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' }
      }
    }
  },

  icon: { componentName: 'NuxtIcon' },

  // Environment variables
  runtimeConfig: {
    MONGODB_URI: process.env.NUXT_MONGODB_URI,
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