<script setup lang="ts">

import LoginButton from "~/components/header/LoginButton.vue";
</script>

<template>
  <header class="flex flex-row justify-between">
    <nuxt-link class="flex gap-2 text-xl items-center font-700 decoration-none text-t-contrast" to="/">
      <NuxtIcon name="lucide:server-cog" class="text-2xl" />
      <span>MezaServers</span>
    </nuxt-link>
    <nav class="flex items-center gap-2">
      <LoginButton />
    </nav>

  </header>
</template>

<style scoped lang="scss">

header {
  width: 100%;
}

</style>