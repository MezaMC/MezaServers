<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue"
import LoaderSpinner from "~/components/ui/LoaderSpinner.vue"

useSeoMeta({ title: "Изменение сервера" })

definePageMeta({
  middleware: 'sever-perm'
})

const serverId = useRoute().params.server as string
const loaded = ref(false)

const { checkPerm } = useUserPerms()

onMounted(() => loaded.value = true)
</script>

<template>
  <div class="flex flex-col gap-4">

    <div class="flex flex-wrap gap-2">
      <UButton icon="lucide:arrow-left" :router-link="`/server/${serverId}`">
        К странице сервера
      </UButton>
      <UButton icon="lucide:book-open" router-link="/editing-rules">
        Правила редактирования
      </UButton>
    </div>

    <ClientOnly v-if="loaded">
      <ServerPageEdit :server-name="serverId" />
    </ClientOnly>
    <LoaderSpinner v-else />

  </div>
</template>