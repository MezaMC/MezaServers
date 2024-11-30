<script setup lang="ts">

import type {ServerData} from "~/server/plugins/ping";
import {toast} from "vue-sonner";
import UButton from "~/components/ui/UButton.vue";
const emit = defineEmits(['updateStars']);

const props = defineProps<{
  data: ServerData
  name: string
  viewerId?: number
}>()

async function starRequest(act: "add" | "remove") {
  const resp: any = await $fetch(`api/server/${props.name}/star`, {
    method: 'post',
    body: { act }
  })
  if (resp.resp !== "ok") return
  if (act == 'add') {
    toast.success(`Вы поставили звезду серверу ${props.name}`)
  } else {
    toast.success(`Вы убрали звезду у сервера ${props.name}`)
  }
  emit('updateStars')

}

</script>

<template>

  <h2>{{name}}</h2>
  <pre>{{data}}</pre>
  <template v-if="viewerId">
    <UButton icon="tabler:star-filled" v-if="viewerId && data.stars?.includes(viewerId)" @click="starRequest('remove')" type="outline"> {{ data.stars.length }} </UButton>
    <UButton icon="tabler:star" v-else @click="starRequest('add')" type="outline"> {{ data.stars.length }} </UButton>
  </template>

</template>

<style scoped lang="scss">

</style>