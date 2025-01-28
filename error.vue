<script setup lang="ts">
import type { NuxtError } from '#app'
import UButton from "~/components/ui/UButton.vue";

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center h-64 gap-4" v-if="error">
      <h1 class="text-6xl text-brand font-bold mb-0 border-none">{{ error.statusCode }}</h1>
      <span>{{ error.message }}</span>
      <UButton type="outline" icon="lucide:arrow-left" router-link="/">На главную</UButton>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">

</style>