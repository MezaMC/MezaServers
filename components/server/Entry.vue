<script setup lang="ts">
import type {ServerData} from "~/server/plugins/ping";
const emit = defineEmits(['updateStars']);

const props = defineProps<{
  serverName: string
  serverData: ServerData
}>()
</script>

<template>
  <div v-if="serverData" class="rounded-2 overflow-hidden border-(1px solid sep) hover:border-sepacc transition-border-color flex flex-col">

    <!-- Верхний блок: Иконка, Название, IP -->
    <ServerEntryTop
        :ip="serverData.ip"
        :name="serverName"
        :displayName="serverData.display?.name || undefined"
        :img="serverData.display?.favicon || undefined"
        :stars="serverData.stars"
        @update-stars="emit('updateStars')"
    />

    <!-- Нижний блок: Описание, Статус, Ссылки -->
    <div class="w-full box-border flex p-l-4 p-r-4 p-4 p-b-5 flex-col gap-3">
      <span v-html="serverData.display?.desc" v-if="serverData.display?.desc" class="text-vptext-1.5" />
      <ServerEntryStatus :data="serverData" />
      <ServerEntryLinks :links="serverData.links" />
    </div>

  </div>
</template>