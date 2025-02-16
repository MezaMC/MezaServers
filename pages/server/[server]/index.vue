<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue";
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue";

const serverId = useRoute().params.server as string
const loaded = ref(false)

onMounted(() => loaded.value = true)

const { checkPerm } = useUserPerms()
const hasPerm = checkPerm(serverId).value
</script>

<template>
  <div class="flex flex-col gap-4">

    <div class="flex flex-wrap gap-2">
      <UButton icon="lucide:arrow-left" router-link="/">
        К списку серверов
      </UButton>
      <ClientOnly>
        <UButton icon="lucide:file-pen" :router-link="`${useRoute().path}/edit`" v-if="hasPerm">
          Изменить сервер
        </UButton>
      </ClientOnly>

    </div>

    <ClientOnly v-if="loaded">
      <ServerPageView :server-name="serverId" />
    </ClientOnly>
    <LoaderSpinner v-else />

  </div>
</template>