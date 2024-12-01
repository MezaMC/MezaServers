<script setup lang="ts">
const { data } = await useFetch('/api/servers')

async function refetch() {
  data.value = await $fetch('/api/servers')
}
</script>

<template>
  <div class="flex flex-col gap-8">

    <ServerEntry
        :server-data="serverData"
        :server-name="serverName as string"
        :key="serverName"
        v-for="(serverData, serverName) in data"
        @update-stars="refetch()"
    />

  </div>
</template>

<style scoped lang="scss">

</style>