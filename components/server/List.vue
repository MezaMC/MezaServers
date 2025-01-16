<script setup lang="ts">
import {computed} from "vue";
import {useSorted} from "@vueuse/core";
import type {ServerData} from "~/server/plugins/ping";

const { data } = await useFetch('/api/servers')

function sortObjectByValue(obj: object, key: string): object {
  return Object.fromEntries(
      Object.entries(obj).sort(([, a], [, b]) => b[key] - a[key])
  );
}

function sortObjectByAlphabet(obj: object): object {
  return Object.fromEntries(
      Object.entries(obj).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  );
}

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

<!--    <pre>{{ data }}</pre>-->

    <ServerEntry
        :server-data="serverData"
        :server-name="serverName as string"
        :key="serverName"
        v-for="([serverName, serverData]) in sortedData"
        @update-stars="refetch()"
    />

  </div>
</template>

<style scoped lang="scss">

</style>