<script setup lang="ts">
import {toast} from "vue-sonner";
import UButton from "~/components/ui/UButton.vue";
const emit = defineEmits(['updateStars']);

const props = defineProps<{
  stars: Array<number>
  name: string
  displayName?: string
}>()

async function starRequest(act: "add" | "remove") {
  const resp: any = await $fetch(`api/server/${props.name}/star`, {
    method: 'post',
    body: {act}
  })

  if (resp.resp !== "ok") return

  if (act == 'add') {
    toast.success(`Вы поставили звезду серверу ${props.displayName ?? props.name}`)
  } else {
    toast.success(`Вы убрали звезду у сервера ${props.displayName ?? props.name}`)
  }
  emit('updateStars')
}
</script>

<template>
  <AuthState v-slot="{ user, loggedIn }">
    <div class="flex items-center m-r-4 lt-phone:(m-t-2 m-r-2)">
      <template v-if="loggedIn && user?.id">
        <UButton
            icon="tabler:star-filled"
            v-if="stars.includes(user.id)"
            @click="starRequest('remove')"
            class="important:(p-l-3 p-r-3)">
          {{ stars.length }}
        </UButton>
        <UButton
            icon="tabler:star"
            v-else
            @click="starRequest('add')"
            class="important:(p-l-3 p-r-3)">
          {{ stars.length }}
        </UButton>
      </template>
      <template v-else>
        <UButton
            icon="tabler:star"
            class="important:(p-l-3 p-r-3 bg-[#00000000] cursor-auto)">
          {{ stars.length }}
        </UButton>
      </template>
    </div>
  </AuthState>
</template>

<style scoped lang="scss">

</style>