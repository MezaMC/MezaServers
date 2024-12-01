<script setup lang="ts">

import type {ServerData} from "~/server/plugins/ping";

const props = defineProps<{
  data: ServerData
}>()

</script>

<template >

  <div class="flex gap-2.5 items-center">

    <template v-if="data.online === true">
      <div class="h-1.5 w-1.5 bg-green rounded shadow-green shadow-[0px_0px_5px_1px] " />
      <span v-if="data.players?.online !== undefined && data.players?.max !== undefined" class="flex gap-1">
        <span class="text-t-secondary">Онлайн:</span>
        <span class="flex gap-0.5">{{ data.players.online }}<span class="text-vptext-3">/</span>{{ data.players.max }}</span>
      </span>
      <template v-if="data.version !== undefined">
        <div class="w-[1px] h-4 bg-sep" />
        <span class="flex gap-1"><span class="lt-phone:hidden text-t-secondary">Версия:</span> {{ data.version }}</span>
      </template>
    </template>

    <template v-else-if="data.status === 'frozen'">
      <div class="h-1.5 w-1.5 bg-[#755858] rounded shadow-[#4a3a3a] shadow-[0px_0px_5px_1px]" />
      <span class="text-vptext-2">Сервер неактивен</span>
    </template>

    <template v-else class="status-bar">
      <div class="h-1.5 w-1.5 bg-red-6 rounded shadow-red-6 shadow-[0px_0px_5px_1px]" />
      <span class="text-vptext-2">Сервер выключен</span>
    </template>

  </div>

</template>

<style scoped lang="scss">

</style>