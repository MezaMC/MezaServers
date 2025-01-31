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

const pushRoute = '/server/' + props.name;
</script>

<template>
  <div class="flex bg-bg-card justify-between border-b-(1px solid sep) lt-phone:(items-start) items-center">
    <div class="flex items-center lt-phone:(flex-col h-[128px] items-start gap-1)">

      <img :src="img || '/pack.png'" alt="server icon"
           width="64" height="64"
           class="hover:brightness-80 cursor-pointer"
           @click="useRouter().push(pushRoute)" />

      <div class="flex flex-col w-fit h-fit sm:m-l-4 m-l-2 gap-0.5">

        <span
            class="font-600 sm:text-2xl text-(xl nowrap t-contrast)
            w-fit h-8 flex items-center hover:brightness-80 cursor-pointer"
            v-html="displayName ?? name" @click="useRouter().push(pushRoute)"
        />

        <div class="flex gap-1 items-center max-h-6">
          <span class="font-mono lt-sm:text-sm h-fit text-brand-main font-700
          flex items-center rounded text-brand">{{ ip }}</span>
          <ServerCopyButton :string="ip" />
        </div>

      </div>

    </div>

    <StarButton :stars="stars" :name="name" :display-name="displayName" @update-stars="emit('updateStars')" />

  </div>
</template>

<style scoped lang="sass">

</style>