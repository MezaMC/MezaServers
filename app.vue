<script setup lang="ts">
import 'assets/css/theme.scss'
import 'assets/css/style.scss'
import {Toaster} from "vue-sonner";

useServerSeoMeta({
  titleTemplate: "%s • MezaServers",
  creator: "envizar",
  description: "Современный мониторинг мистических Minecraft серверов",

  ogTitle: "MezaServers",
  ogDescription: "Современный мониторинг мистических Minecraft серверов",
  ogLocale: "ru_RU",
  ogImage: "https://servers.meza.one/logo.png",
  ogType: "website"
})
</script>

<template>
  <NuxtLayout />
  <Toaster position="bottom-right" theme="dark" rich-colors />
</template>