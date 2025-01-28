<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue";
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";

const serverName = useRoute().params.server
const loaded = ref(false)

onMounted(() => loaded.value = true)
</script>

<template>
  <div class="flex flex-col gap-4">

    <UButton icon="lucide:arrow-left" router-link="/">
      К списку серверов
    </UButton>

    <ClientOnly v-if="loaded">
        <ServerPage :server-name="serverName as string" />
    </ClientOnly>

    <LoaderSpinner v-else />

  </div>
</template>