<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue"
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue"

useSeoMeta({ title: "Изменение сервера" })

definePageMeta({
  middleware: 'sever-perm'
})

const serverId = useRoute().params.server as string
const loaded = ref(false)

onMounted(() => loaded.value = true)

const { checkPerm } = useUserPerms()
const hasPerm = checkPerm(serverId).value
</script>

<template>
  <div class="flex flex-col gap-4">

    <UButton icon="lucide:arrow-left" :router-link="`/server/${serverId}`">
      К странице сервера
    </UButton>

    <ClientOnly v-if="loaded">
      <ServerPageEdit :server-name="serverId" />
    </ClientOnly>
    <LoaderSpinner v-else />

  </div>
</template>