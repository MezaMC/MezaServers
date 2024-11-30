<script setup lang="ts">

import UHeader from "~/components/header/UHeader.vue";
</script>

<template>
  <div class="content">

    <UHeader />

    <main class="rounded-xl">
      <NuxtPage />
    </main>

  </div>
</template>

<style scoped lang="scss">
.content {
  --margin: 2rem;
  width: 800px;
  min-height: calc(100vh - 2*var(--margin));
  margin: var(--margin) 0;
  --uno: "flex flex-col gap-4";
}

main {
  box-sizing: border-box;
  background-color: var(--c-bg-main);
  outline: var(--c-sep) 1px solid;
  box-shadow: var(--c-shadow) 0 0 16px;
  padding: 1rem 2rem;
  flex-grow: 1;
}
</style>