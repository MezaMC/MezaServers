<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue";

const props = defineProps<{
  data: {
    icon?: string,
    href: string,
    label: string
  }[]
}>()
</script>

<template>
  <div class="flex items-center w-full gap-4 flex-wrap">

    <UButton
        v-for="link of data"
        type="outline"
        :icon="link.icon"
        :target-blank="true"
        :href="link.href"
        :key="link.label"
    >
      {{ link.label }}
    </UButton>

  </div>
</template>