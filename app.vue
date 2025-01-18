<script setup lang="ts">
import 'assets/css/theme.scss'
import 'assets/css/style.scss'
import {Toaster} from "vue-sonner";

useSeoMeta({
  titleTemplate: "%s • MezaServers",
  creator: "envizar",
  description: "Современный мониторинг мистических серверов",

  ogTitle: "MezaServers",
  ogDescription: "Современный мониторинг мистических серверов",
  ogLocale: "ru_RU",
  ogImage: "https://servers.meza.one/logo.png",
  ogType: "website"
})

useFavicon("/favicon.svg")
</script>

<template>
  <NuxtLayout />
  <Toaster position="bottom-right" theme="dark" rich-colors />
</template>