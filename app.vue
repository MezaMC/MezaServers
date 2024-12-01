<script setup lang="ts">
import 'assets/css/theme.scss'
import 'assets/css/style.scss'
import {Toaster} from "vue-sonner";

useSeoMeta({
  titleTemplate: "%s ・ MezaServers"
})
</script>

<template>
  <AppLayout />

  <Toaster position="bottom-right" :theme="$colorMode.value as 'dark' | 'light' | 'system'" rich-colors />
</template>