<script setup lang="ts">
import 'assets/css/theme.scss'
import 'assets/css/style.scss'
import {Toaster} from "vue-sonner";

useSeoMeta({
  titleTemplate: "%s • Мониторинг MezaServers",
})

useFavicon("/favicon.svg")
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster position="bottom-right" theme="dark" />
</template>