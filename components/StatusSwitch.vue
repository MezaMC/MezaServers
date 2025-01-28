<script setup lang="ts">
import type {ServerStatus} from "~/server/utils/servers";
import UButton from "~/components/ui/UButton.vue";
import {toast} from "vue-sonner";

const emit = defineEmits(['updateStatus']);

const props = defineProps<{
  initStatus: ServerStatus
  serverName: string
}>()

interface StatusRecord {
  id: ServerStatus,
  label: string
  icon?: string
  color: string
}

const statusRecords: StatusRecord[] = [
  { id: "active", label: "Активен", icon: "lucide:zap", color: "#e7c66f" },
  { id: "maintenance", label: "Технические работы", icon: "lucide:wrench", color: "#5fd7e3" },
  { id: "frozen", label: "Временно заморожен ", icon: "lucide:snowflake", color: "#c8d0ec" }
]

const status = ref<ServerStatus>(props.initStatus)

async function updateStatus() {

  const resp: any = await $fetch(`/api/server/${props.serverName}/edit`, {
    method: 'post',
    body: { act: 'status', status: status.value }
  })

  const errorMessages: {[msg: string]: string} = {
    "not logged in": "Вы не вошли в аккаунт.",
    "server not found": "Такой сервер не найден.",
    "no perms": "Недостаточно прав.",
    "unknown status": "Неизвестный статус."
  }

  if (resp.error in errorMessages)
    toast.error(errorMessages[resp.error])

  else if (resp.resp === "ok") {
    toast.success(`Статус сервера изменён с ${props.initStatus} на ${status.value}`)
    emit("updateStatus")
  }
}
</script>

<template>
  <div class="flex justify-center">
    <div class="bg-bg-body p-2 rounded-lg flex gap-2 w-fit box-border justify-center items-center flex-wrap lt-sm:(flex-col)">

      <div class="bg-bg-card flex w-fit p-(1.5 l-3 r-3) rounded items-center gap-1.5 cursor-pointer lt-sm:(w-full box-border)"
           :class="status === statusRecord.id ? 'text-t-contrast border-(1 solid sep)' : 'text-t-secondary'"
           v-for="statusRecord in statusRecords"
           @click="status = statusRecord.id"
      >
        <NuxtIcon v-if="statusRecord.icon" :name="statusRecord.icon" :style="`color: ${status === statusRecord.id ? statusRecord.color : 'currentColor'}`" />
        <span>{{ statusRecord.label }}</span>
      </div>

      <UButton icon="lucide:save" :inactive="initStatus == status" @click="updateStatus()">Сохранить</UButton>

    </div>
  </div>
</template>

<style scoped lang="scss">

</style>