<script setup lang="ts">

import UButton from "~/components/ui/UButton.vue";
import {computed} from "vue";

const colorMode = useColorMode()

const colorModeIcon = computed(() => {
  return {
    'light': 'lucide:sun',
    'dark': 'lucide:moon',
    'system': 'lucide:sun-moon'
  }[colorMode.preference || 'dark']
  // return colorMode.value
})

function switchTheme() {
  colorMode.preference = {
    'dark': 'light',
    'light': 'system',
    'system': 'dark',
  }[colorMode.preference] || 'dark'
}
</script>

<template>
  <UButton
      type="link"
      :icon="colorModeIcon" @click="switchTheme()"
  > {{ colorMode.preference }} </UButton>
</template>

<style scoped lang="scss">

</style>