<script setup lang="ts">
import {toast} from "vue-sonner";
import UButton from "~/components/ui/UButton.vue";
import {useServerValues} from "~/composables/useServerValues";

const refresh = inject<() => Promise<void>>('refreshFun')!
const serverData = inject<Ref<ServerData>>("server")!

const { displayName } = useServerValues(serverData)

async function starRequest(act: "add" | "remove") {
  const resp: any = await $fetch(`/api/server/${serverData.value.name}/star`, {
    method: 'post',
    body: {act}
  })

  if (resp.resp !== "ok") return

  if (act == 'add') {
    toast.success(`Вы поставили звезду серверу ${displayName.value}`)
  } else {
    toast.success(`Вы убрали звезду у сервера ${displayName.value}`)
  }
  await refresh()
}
</script>

<template>
  <AuthState v-slot="{ user, loggedIn }">
    <div class="flex items-center m-r-4 lt-phone:(m-t-2 m-r-2)">

      <template v-if="loggedIn && user?.id">

        <UButton
            v-if="serverData.stars.includes(user.id)"
            icon="tabler:star-filled"
            class="important:(p-l-3 p-r-3)"
            @click="starRequest('remove')">
          {{ serverData.stars.length }}
        </UButton>

        <UButton
            v-else
            icon="tabler:star"
            class="important:(p-l-3 p-r-3)"
            @click="starRequest('add')">
          {{ serverData.stars.length }}
        </UButton>

      </template>

      <UButton
          v-else
          icon="tabler:star"
          class="important:(p-l-3 p-r-3 bg-[#00000000] cursor-auto)">
        {{ serverData.stars.length }}
      </UButton>

    </div>
  </AuthState>
</template>