<script setup lang="ts">
import GithubCard from "~/components/ui/GithubCard.vue"
import UButton from "~/components/ui/UButton.vue"
import {toast} from "vue-sonner"

const props = defineProps<{
  perms: string[]
  github_id: number
}>()

let initPermsString: string
let permsString = ref()

const updateVars = () => {
  initPermsString = props.perms.join(",")
  permsString.value = initPermsString
}

watch(() => props.perms, updateVars)
onMounted(updateVars)

const emit = defineEmits(['updatePerms'])

const deletePerm = async () => {
  await $fetch("/api/perm/edit", {
    method: 'post',
    body: {
      act: 'delete',
      github_id: props.github_id
    }
  })
  emit('updatePerms')
}

const editPerm = async () => {
  const resp: any = await $fetch("/api/perm/edit", {
    method: 'post',
    body: {
      act: 'edit',
      github_id: props.github_id,
      perms: permsString.value.split(",")
    }
  })
  if (resp.status === "ok") {
    emit('updatePerms')
    initPermsString = permsString.value
    toast.success("Права пользователя обновлены")
  }
}
</script>

<template>
  <form class="bg-bg-card border-(1 solid sep) rounded-2 flex gap-4 items-center p-2 lt-sm:(flex-col p-4)" @submit.prevent="editPerm" >
    <GithubCard :github_id :show-id="true" />
    <input v-model="permsString" class="flex-grow-1 min-w-0 w-full font-mono" />
    <div class="flex gap-2">
      <button type="submit">
        <UButton icon="lucide:save" :inactive="permsString == initPermsString" />
      </button>
      <UButton icon="lucide:trash-2" style="--color: 255, 60, 60" @click="deletePerm" />
    </div>
  </form>
</template>