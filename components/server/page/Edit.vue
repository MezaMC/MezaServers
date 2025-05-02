<script setup lang="ts">
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";
import EditForm from "~/components/server/EditForm.vue";
import type {ServerData} from "~/server/utils/servers";

const props = defineProps<{
  serverName: string
}>()

const { data: serverData, refresh } = await useFetch<ServerData>(`/api/server/${props.serverName}`, {
  onResponseError({ response }) {
    showError({
      statusCode: response._data.statusCode,
      message: response._data.statusMessage
    })
  }
})

const updateServerData = async () => {
  await refresh()
  clearNuxtState('serversData')
}

provide<() => Promise<void>>('refreshFun', updateServerData)
</script>

<template>
  <ServerContext :server-data="serverData" v-if="serverData">
    <ServerCardRoot />
    <EditForm />
  </ServerContext>
  <LoaderSpinner v-else />
</template>