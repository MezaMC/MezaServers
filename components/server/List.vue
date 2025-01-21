<script setup lang="ts">
import {computed} from "vue";
import type {ServerData} from "~/server/plugins/ping";

const { data } = await useFetch('/api/servers')
async function refetch() {
  data.value = await $fetch('/api/servers')
}

const sortedData = computed(() => {
  return Object.entries(data.value as {[name: string]: ServerData})
      .sort(([nameA, dataA], [nameB, dataB]) => {
        const starsCompare = (dataB.stars?.length || 0) - (dataA.stars?.length || 0);
        if (starsCompare !== 0) return starsCompare;

        return nameA.localeCompare(nameB);
      });
});
</script>

<template>
  <div class="flex flex-col gap-8">

    <ServerEntry
        :server-data="serverData"
        :server-name="serverName as string"
        :key="serverName"
        v-for="([serverName, serverData]) in sortedData"
        @update-stars="refetch()"
    />

  </div>
</template>