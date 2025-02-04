<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue";
import {toast} from "vue-sonner";

useSeoMeta({ title: "Управление правами" })

const updateData = async () => {
  permsData.value = await $fetch("/api/perm/list")
}

const permsData = ref()

updateData()

const addPerm = async () => {
  const resp: any = await $fetch("/api/perm/edit", {
    method: 'post',
    body: {
      act: 'add',
      github_id: addFormData.value.github_id,
      perms: addFormData.value.perms.split(",")
    }
  })
  if (resp.status === "ok") {
    await updateData()
    toast.success("Вы создали запись с правами")
  }
  else if (resp.error === "user exists") {
    toast.error("Такая запись уже существует")
  }
}

const addFormData = ref({
  github_id: null,
  perms: "",
});
</script>

<template>
  <h1>Управление правами</h1>
  <div class="flex flex-col gap-6">

    <PermCard
        v-for="(perms, github_id) of permsData"
        :github_id="Number(github_id)"
        :perms @update-perms="updateData()"
    />

    <form class="flex gap-2 w-full" @submit.prevent="addPerm()">
      <input type="number" placeholder="GitHub ID" required v-model="addFormData.github_id">
      <input placeholder="Права через запятую" class="flex-grow-1" required v-model="addFormData.perms">
      <button type="submit">
        <UButton type="outline" icon="lucide:user-plus" :inactive="!(addFormData.perms && addFormData.github_id)">Создать</UButton>
      </button>
    </form>

  </div>
</template>

<style scoped lang="scss">

</style>