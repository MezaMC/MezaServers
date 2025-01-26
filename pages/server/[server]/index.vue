<script setup lang="ts">
import type {ServerData} from "~/server/plugins/ping";
import UButton from "~/components/ui/UButton.vue";

const serverName = useRoute().params.server

const { data } = await useFetch<ServerData>(`/api/server/${serverName}`)
async function refetch() {
  data.value = await $fetch<ServerData>(`/api/server/${serverName}`)
}

if (data.value === undefined) {
  throw createError({ statusCode: 404, statusMessage: 'Server Not Found' });
}
</script>

<template>
  <div class="flex flex-col gap-4">

    <UButton icon="lucide:arrow-left" router-link="/">К списку серверов</UButton>

    <ServerEntry
        :server-data="data!"
        :server-name="serverName! as string"
        @update-stars="refetch()"
    />

  </div>
</template>