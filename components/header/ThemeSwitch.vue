<script setup lang="ts">

import UButton from "~/components/ui/UButton.vue";
import {computed} from "vue";

const colorMode = useColorMode()

const colorModeIcon = computed(() => {
  return {
    'light': 'lucide:sun',
    'dark': 'lucide:moon',
    'system': 'lucide:sun-moon'
  }[colorMode.preference as string || 'dark']
  // return colorMode.value
})

function switchTheme() {
  colorMode.preference = {
    'dark': 'light',
    'light': 'system',
    'system': 'dark',
  }[colorMode.preference as string] || 'dark'
}
</script>

<template>
  <UButton
      type="link"
      :icon="colorModeIcon" @click="switchTheme()"
      class="important:lt-phone:(p-l-1 p-r-1)"
  > </UButton>
</template>

<style scoped lang="scss">

</style>