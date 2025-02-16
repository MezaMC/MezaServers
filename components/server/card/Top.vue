<script setup lang="ts">
import CopyButton from "~/components/ui/CopyButton.vue";
import {useServerValues} from "~/composables/useServerValues";

const serverData = inject<Ref<ServerData>>("server")!

const { address, displayName, route } = useServerValues(serverData)
</script>

<template>
  <div class="flex bg-bg-card justify-between border-b-(1px solid sep) lt-phone:(items-start) items-center" v-if="serverData">
    <div class="flex items-center lt-phone:(flex-col h-[128px] items-start gap-1)">

      <!-- Иконка 64x64 -->
      <RouterLink class="w-64px h-64px" :to="route">
        <img :src="serverData.display?.favicon || '/pack.png'" alt="server icon"
             width="64" height="64"
        />
      </RouterLink>

      <!-- Название и адрес -->
      <div class="flex flex-col w-fit h-fit sm:m-l-4 m-l-2 gap-0.5">
        <RouterLink
            class="font-600 sm:text-2xl text-(xl nowrap t-contrast) decoration-none
            w-fit h-8 flex items-center"
            :to="route"
        >{{ displayName }}</RouterLink>
        <div class="flex gap-1 items-center max-h-6">
          <span class="font-mono lt-sm:text-sm h-fit text-brand-main font-700
          flex items-center rounded text-brand">{{ address }}</span>
          <CopyButton :string="address" />
        </div>
      </div>

    </div>

    <ServerCardStarButton />
  </div>
</template>