<script setup lang="ts">
import type {ServerData} from "~/server/utils/servers";
import {useServerValues} from "~/composables/useServerValues";

const serverData = inject<Ref<ServerData>>("server")!

const { descHtml } = useServerValues(serverData)
</script>

<template>
  <div v-if="serverData" class="rounded-2 overflow-hidden border-(1px solid sep) hover:border-sepacc transition-border-color flex flex-col">

    <!-- Верхний блок: Иконка, Название, IP -->
    <ServerCardTop />

    <!-- Нижний блок: Описание, Статус, Ссылки -->
    <div class="w-full box-border flex p-l-4 p-r-4 p-4 p-b-5 flex-col gap-3 bg-bg-cardalt">
      <span v-html="descHtml" v-if="serverData.display?.desc" class="text-vptext-1.5" />
      <ServerCardStatus />
      <ServerCardLinks />
    </div>

  </div>
</template>