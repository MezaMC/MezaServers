<script setup lang="ts">
const props = defineProps<{
  serverData: ServerData
}>()

provide('server', computed(() => props.serverData))
</script>

<template>
  <div><slot /></div>
</template>