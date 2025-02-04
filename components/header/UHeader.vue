<script setup lang="ts">
import UserMenu from "~/components/header/UserMenu.vue";

interface NavLink {
  text: string
  link: string
  icon?: string
  external?: boolean
}

const navLinks: Array<NavLink> = [
  { text: "Главная", link: "/", icon: "lucide:home" },
  { text: "Добавить сервер", link: "/adding-server", icon: "lucide:circle-plus" },
  { text: "ЧаВо", link: "/faq", icon: "lucide:message-circle-question" },
  { text: "Telegram", link: "https://t.me/meza_inc", icon: "tabler:brand-telegram", external: true },
]

const ver = useRuntimeConfig().public.VER
const label = useRuntimeConfig().public.LABEL
</script>

<template>
  <header class="flex flex-col gap-3 lt-phone:m-b-2">

    <!-- Название и кнопка входа/выхода-->
    <div class="flex flex-row justify-between w-full">
      <div class="flex gap-2 text-xl items-center font-700 decoration-none text-t-contrast">
        <NuxtImg src="/logo.svg" alt="logo" class="w-6 h-6" />
        <span class="flex gap-0.7">
          {{ label }}
          <span class="text-brand text-sm transform-translate-y--0.5">{{ ver }}</span>
        </span>
      </div>
      <div class="flex items-center gap-2">
        <UserMenu />
      </div>
    </div>

    <!-- Навигация -->
    <nav class="flex flex-row w-full flex-wrap gap-[0.5rem_1.25rem]">
      <template v-for="linkData in navLinks">
        <NuxtLink
            :to="linkData.link"
            class="nav-item"
            :target="linkData.external ? '_blank' : '_self'"
        >
          <NuxtIcon :name="linkData.icon" v-if="linkData.icon !== undefined" />
          <span>{{linkData.text}}</span>
        </NuxtLink>
      </template>
    </nav>

  </header>

</template>

<style scoped lang="scss">
.nav-item {
  @apply "flex items-center gap-1.2";
}

.router-link-active {
  filter: brightness(1.4);
}
</style>