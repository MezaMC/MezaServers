<template>
  <HSep :id="props.id">
    <a
        v-if="props.id && generate"
        :href="`#${props.id}`"
    >
      <slot />
    </a>
    <slot v-else />
  </HSep>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'
import HSep from "~/components/ui/HSep.vue";

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>