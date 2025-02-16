<script setup lang="ts">
import { computed } from "vue";
import type { ServerData } from "~/server/utils/servers";
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";

type ServersDataType = { [name: string]: ServerData }

const { data: serversDataCached } = useNuxtData<ServersDataType>("serversData")

const { data: serversData, status, refresh } = await useFetch<ServersDataType>('/api/servers', {
  key: "serversData",
  immediate: !serversDataCached?.value
})

provide<() => Promise<void>>('refreshFun', refresh)

onMounted(() => serversData.value ??= serversDataCached?.value)

const serversDataSorted = computed(() => {
  return Object.entries(serversData.value ?? {})
      .sort(([nameA, dataA], [nameB, dataB]) => {
        const starsCompare = (dataB.stars?.length || 0) - (dataA.stars?.length || 0)
        if (starsCompare !== 0) return starsCompare

        return nameA.localeCompare(nameB)
      })
})
</script>

<template>

  <transition-group tag="div" class="flex flex-col gap-8" name="flip" v-if="status == 'success' || serversData">
    <ServerContext :server-data="serverData" :key="serverName" v-for="[serverName, serverData] of serversDataSorted">
      <ServerCardRoot />
    </ServerContext>
  </transition-group>

  <LoaderSpinner v-if="status == 'pending' && !serversData" />

</template>

<style lang="scss">
.flip-move {
  transition: transform 300ms ease-in-out;
}
</style>