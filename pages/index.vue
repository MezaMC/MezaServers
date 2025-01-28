<script setup lang="ts">
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";

useSeoMeta({ title: "Список серверов" })
const loaded = ref(false)

onMounted(() => loaded.value = true)
</script>

<template>

  <h1 class="m-b-[2rem]">Мистические сервера</h1>

  <ClientOnly v-if="loaded">
    <ServerList />
  </ClientOnly>
  <LoaderSpinner v-else />

  <!-- For SEO -->
  <p class="text-t-secondary m-t-6 m-b-0">
    Мониторинг мистических Minecraft серверов MezaServers
    - уникальный проект, призванный собрать мистические
    сервера русскоязычного сообщества Майнкрафт крипипаст
    в одном месте. Цель мониторинга - дать возможность любому
    игроку посетить аномальные, жуткие и загадочные сервера
    нашего малоизвестного комьюнити.
  </p>

</template>