// https://nuxt.com/docs/api/configuration/nuxt-config
import packageJson from './package.json'

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
    '@nuxt/eslint',
  ],

  site: {
    name: packageJson.displayName,
    url: 'servers.meza.one',
  },

  // Rendering options
  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
    }
  },

  routeRules: {
    "/server/**": { prerender: false },
    "/server/*/edit": { ssr: false },
    "/api/**": { prerender: false },
    "/auth/**": { prerender: false },
    "/admin/**": { prerender: false, ssr: false, appMiddleware: "admin-only" }
  },

  // Seo meta
  seo: {
    enabled: true,
    meta: {
      creator: packageJson.author,
      description: packageJson.description,
      title: packageJson.displayName,
      keywords: "MezaServers Meza Servers MezaBook Minecraft Майнкрафт мистические сервера мистика",

      ogTitle: packageJson.displayName,
      ogDescription: packageJson.description,
      ogLocale: "ru",
      ogImage: "https://servers.meza.one/logo.png",
      ogImageHeight: 128,
      ogImageWidth: 128,
      ogType: "website",
      ogUrl: "https://servers.meza.one"
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      }
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
    },
    public: {
      VER: `v${packageJson.version}`,
      LABEL: packageJson.displayName
    }
  },

})