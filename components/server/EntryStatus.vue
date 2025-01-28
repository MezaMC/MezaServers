<script setup lang="ts">
import type {ServerData} from "~/server/utils/servers";

const props = defineProps<{
  data: ServerData
}>()
</script>

<template >

  <div class="flex gap-2.5 items-center">

    <template v-if="data.online === true">
      <div class="bg-green shadow-green indicator" />
      <span v-if="data.players?.online !== undefined && data.players?.max !== undefined" class="flex gap-1">
        <span class="text-t-secondary">Онлайн:</span>
        <span class="flex gap-0.5">{{ data.players.online }}<span class="text-t-secondary">/</span>{{ data.players.max }}</span>
      </span>
      <template v-if="data.version !== undefined">
        <div class="w-[1px] h-4 bg-sep" />
        <span class="flex gap-1"><span class="lt-phone:hidden text-t-secondary">Версия:</span> {{ data.version }}</span>
      </template>
    </template>

    <template v-else-if="data.status === 'maintenance'">
      <div class="bg-blue-5 shadow-blue-6 indicator" />
      <span class="text-t-secondary">Технические работы</span>
    </template>

    <template v-else-if="data.status === 'frozen'">
      <div class="bg-gray-5 shadow-gray-6 indicator" />
      <span class="text-t-secondary">Временно заморожен</span>
    </template>

    <template v-else>
      <div class="bg-red-6 shadow-red-6 indicator" />
      <span class="text-t-secondary">Выключен</span>
    </template>

  </div>

</template>

<style scoped lang="scss">

.indicator {
  @apply "h-1.5 w-1.5 shadow-[0px_0px_5px_1px] rounded-full m-l-0.75";
}

</style>