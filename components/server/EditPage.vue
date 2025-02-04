<script setup lang="ts">
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";

const props = defineProps<{
  serverName: string
}>()

type ServersDataType = { [name: string]: ServerData }
const serversDataState = useState<ServersDataType | null>('serversData', () => null)

const serverData = ref<ServerData>()

async function updateServerData(resetState: boolean = true) {
  serverData.value = await $fetch<ServerData>(`/api/server/${props.serverName}`)

  if (resetState) {
    // Reset shared 'serversData' state for list component
    serversDataState.value = null
  }
}

updateServerData(false)
</script>

<template>
  <template v-if="serverData">
    <ServerEntry
        :server-data="serverData"
        :server-name="serverName"
        @update-stars="updateServerData()"
    />
    <StatusSwitch
        :init-status="serverData.status"
        :server-name="serverName"
        @update-status="updateServerData()"
    />
  </template>
  <LoaderSpinner v-else />
</template>