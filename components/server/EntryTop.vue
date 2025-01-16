<script setup lang="ts">

import StarButton from "~/components/server/StarButton.vue";
const props = defineProps<{
  ip: string
  name: string
  displayName?: string
  img?: string
  stars: Array<number>
}>()

const emit = defineEmits(['updateStars']);

</script>

<template>
  <div class="flex bg-bg-card justify-between border-b-(1px solid sep) lt-phone:(items-start) items-center">
    <div class="flex items-center lt-phone:(flex-col h-[128px] items-start gap-1)">
      <img :src="img" alt="server icon" width="64" height="64" />
      <div class="debug flex flex-col w-fit h-fit sm:m-l-4 m-l-2 gap-0.5">
        <span class="debug font-600 sm:text-2xl text-xl h-8 text-nowrap flex items-center" v-html="displayName ?? name"></span>
        <div class="flex gap-1 items-center max-h-6">
          <span class="debug font-mono lt-sm:text-sm h-fit text-brand-main font-700 flex items-center rounded">{{ ip }}</span>
          <ServerCopyButton :string="ip" />
        </div>
      </div>
    </div>

    <StarButton :stars="stars" :name="name" :display-name="displayName" @update-stars="emit('updateStars')" />

  </div>
</template>

<style scoped lang="sass">

</style>