<script setup lang="ts">

import type {ServerData} from "~/server/plugins/ping";
const emit = defineEmits();

const props = defineProps<{
  data: ServerData
  name: string
  viewerId?: number
}>()

async function starRequest(act: "add" | "remove") {
  const resp = await $fetch(`api/server/${props.name}/star`, {
    method: 'post',
    body: { act }
  })
  console.log(resp)
  emit('update-stars')

}

</script>

<template>

  <h2>{{name}}</h2>
  <pre>{{data}}</pre>
  <UButton icon="lucide:star-off" label="remove star" v-if="viewerId && data.stars?.includes(viewerId)" @click="starRequest('remove')" />
  <UButton icon="lucide:star" label="add star" v-else @click="starRequest('add')" />

</template>

<style scoped lang="scss">

</style>