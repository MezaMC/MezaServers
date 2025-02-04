<script setup lang="ts">
import UHeader from "~/components/header/UHeader.vue";
</script>

<template>
  <div class="content">

    <AdBanner />

    <UHeader />

    <main class="block-container">
      <slot />
    </main>

    <footer class="block-container">
      <span>Выпущено под
        <NuxtLink to="https://github.com/MezaMC/MezaServers/blob/main/LICENSE" target="_blank">лицензией MIT</NuxtLink>
      </span>
      <span>Copyright © {{(new Date()).getFullYear()}}
        <NuxtLink to="https://envizar.meza.one" target="_blank">envizar</NuxtLink>
      </span>
    </footer>

  </div>
</template>

<style scoped lang="scss">

.content {
  --margin: 2rem;
  max-width: 800px;
  width: 90vw;
  min-height: calc(100vh - 2*var(--margin));
  margin: var(--margin) 0;
  --uno: "flex flex-col gap-5";
}

.block-container {
  @apply "rounded-xl box-border";
  @apply "p-8 lt-phone:p-4";
  background-color: var(--c-bg-main);
  outline: var(--c-sep) 1px solid;
  box-shadow: var(--c-shadow) 0 0 16px;
}

main {
  @apply "flex-grow-1";
}

footer {
  @apply "flex items-center flex-col important:(p-t-4 p-b-4) gap-2 text-t-primary";
}

</style>