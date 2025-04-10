<script setup lang="ts">
import { computed } from "vue";
import type { ServerData } from "~/server/utils/servers";
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";
import UButton from "~/components/ui/UButton.vue";

type ServersDataType = { [name: string]: ServerData }

const { data: serversDataCached } = useNuxtData<ServersDataType>("serversData")

const { data: serversData, status, refresh } = await useFetch<ServersDataType>('/api/servers', {
  key: "serversData",
  immediate: !serversDataCached?.value
})

provide<() => Promise<void>>('refreshFun', refresh)

onMounted(() => serversData.value ??= serversDataCached?.value)

// Compare only by stars
function compareStarsFun(
    [nameA, dataA]: [string, ServerData],
    [nameB, dataB]: [string, ServerData]
): number {
  const compare = (dataB.stars?.length || 0) - (dataA.stars?.length || 0)
  if (compare !== 0) return compare
  return nameA.localeCompare(nameB)
}

// Compare by status, then by online, then by stars
function compareOnlineFun(
    [nameA, dataA]: [string, ServerData],
    [nameB, dataB]: [string, ServerData]
): number {
  const compareStatus =  +(dataB.online || false) - +(dataA.online || false)
  if (compareStatus !== 0) return compareStatus
  const compareOnline = (dataB.players?.online || 0) - (dataA.players?.online || 0)
  if (compareOnline !== 0) return compareOnline
  const compareStars = (dataB.stars?.length || 0) - (dataA.stars?.length || 0)
  if (compareStars !== 0) return compareStars
  return nameA.localeCompare(nameB)
}

const sortType = ref<'online' | 'stars'>('online')
const compareFunctions = {
  'online': compareOnlineFun,
  'stars': compareStarsFun
}

const serversDataSorted = computed(() => {
  return Object.entries(serversData.value ?? {})
      .sort(compareFunctions[sortType.value])
})

const sortOpen = ref(false)
</script>

<template>

  <div class="sort-settings flex flex-col gap-2 m-b-[1.5rem]">
    <span class="text-t-secondary" @click="sortOpen = !sortOpen">Сортировка <span class="font-mono">{{ sortOpen ? "▾" : "▸"  }}</span></span>

    <div class="flex gap-2 lt-phone:flex-col" v-if="sortOpen">
      <UButton
          @click="sortType = 'online'"
          icon="lucide:chart-no-axes-column"
          :type="sortType == 'online' ? 'outline' : 'link'"
      >По онлайну</UButton>
      <UButton
          @click="sortType = 'stars'"
          icon="lucide:sparkles"
          :type="sortType == 'stars' ? 'outline' : 'link'"
      >По звёздам</UButton>
    </div>

  </div>

  <transition-group tag="div" class="flex flex-col gap-8" name="flip" v-if="status == 'success' || serversData" :key="sortType">
    <ServerContext :server-data="serverData" :key="serverName" v-for="[serverName, serverData] of serversDataSorted">
      <ServerCardRoot />
    </ServerContext>
  </transition-group>

  <LoaderSpinner v-if="status == 'pending' && !serversData" />

</template>

<style lang="scss" scoped>
.flip-move {
  transition: transform 300ms ease-in-out;
}

.sort-settings {
  .open-indicator {
    display: inline-block;
    margin-left: .5rem;
    transition: 150ms ease-in-out all;
    &.open {
      transform: rotate(90deg);
    }
  }

}

</style>