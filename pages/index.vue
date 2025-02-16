<script setup lang="ts">
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";
import HSep from "~/components/ui/HSep.vue";
import Links from "~/components/ui/Links.vue";

useSeoMeta({ title: "Список серверов" })
const loaded = ref(false)

onMounted(() => loaded.value = true)

const linksData = [
  {
    icon: "tabler:brand-github",
    href: "https://github.com/MezaMC/MezaServers",
    label: "GitHub"
  },
  {
    icon: "tabler:brand-telegram",
    href: "https://t.me/meza_inc",
    label: "Telegram"
  },
  {
    icon: "tabler:brand-discord",
    href: "https://ds.meza.one",
    label: "Discord"
  }
]
</script>

<template>

  <h1 class="m-b-[2rem]">Мистические сервера</h1>

  <ClientOnly v-if="loaded">
    <ServerPageList />
  </ClientOnly>
  <LoaderSpinner v-else />

  <HSep>О проекте</HSep>

  <p>
    Мониторинг мистических Minecraft серверов MezaServers
    &mdash; уникальный проект, призванный собрать мистические
    сервера русскоязычного сообщества Майнкрафт крипипаст
    в одном месте. Цель мониторинга - дать возможность любому
    игроку посетить аномальные, жуткие и загадочные сервера
    нашего малоизвестного комьюнити.
  </p>

  <p class="">
    Сервера с мистикой &mdash; особый тип Minecraft серверов, на которых
    можно встретить различные аномалии. Такие сервера могут пугать
    своей хоррор составляющей или давить мрачной атмосферой. Нередко
    на таких проектах обитают мифы и подобные загадочные существа.
  </p>

  <HSep>Ссылки</HSep>

  <Links :data="linksData" />

</template>