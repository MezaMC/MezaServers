<script setup lang="ts">
import { computed } from "vue";
import type { ServerData } from "~/server/plugins/ping";

type ServersDataType = { [name: string]: ServerData }

const serversData = useState<ServersDataType | null>('serversData', () => null)

if (!serversData.value) {
  refetchServersData()
}

async function refetchServersData() {
  serversData.value = await $fetch<ServersDataType>('/api/servers')
}

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
  <div class="flex flex-col gap-8">
    <ServerEntry
        :server-data="serverData"
        :server-name="serverName as string"
        :key="serverName"
        v-for="([serverName, serverData]) in serversDataSorted"
        @update-stars="refetchServersData()"
    />
  </div>
</template>
