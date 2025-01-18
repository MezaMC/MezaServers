<script setup lang="ts">

import {toast} from "vue-sonner";

const props = defineProps<{ string: string }>()

function toClipboard(text: string){
  navigator.clipboard.writeText(text);
  toast.success(`${text} скопировано в буфер обмена.`);
}

</script>

<template>
  <button @click="toClipboard(string)" class="h-7.5 w-7.5 bg-transparent border-none cursor-pointer
      transition flex items-center justify-center rounded outline-transparent text-t-secondary
      hover:(bg-bg-body outline-(solid 1px sep) text-vptext-1) active:(scale-90 border-brand text-brand-main)">
    <NuxtIcon name="lucide:copy" />
  </button>
</template>

<style scoped lang="scss">

</style>