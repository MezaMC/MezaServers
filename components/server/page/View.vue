<script setup lang="ts">
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";
import DOMPurify from "dompurify";
import Carousel from "~/components/ui/Carousel.vue";
import {useServerValues} from "~/composables/useServerValues";

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

onMounted(() => {
  if (!serverData || !serverData.value) return
  const { displayName } = useServerValues(serverData as Ref<ServerData>)
  useSeoMeta({ title: displayName })
})

const updateServerData = async () => {
  await refresh()
  clearNuxtState('serversData')
}

provide<() => Promise<void>>('refreshFun', updateServerData)
</script>

<template>
  <ServerContext :server-data="serverData" v-if="serverData" class="flex flex-col gap-4">
    <ServerCardRoot />

    <MDC v-if="serverData.desc" :value="DOMPurify.sanitize(serverData.desc)" />

    <Carousel
        :images="serverData.images"
        v-if="serverData.images !== undefined && serverData.images.length > 0"
    />
  </ServerContext>
  <LoaderSpinner v-else />
</template>