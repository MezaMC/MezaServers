<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue";

useSeoMeta({
  title: "Список серверов"
})
</script>

<template>
  <h1>Мистические сервера</h1>

  <ServerList />

  <div class="flex items-center justify-center w-full mt-8">
    <UButton type="outline" icon="lucide:plus"
             href="https://github.com/MezaMC/MezaServers/issues/new?labels=%D0%A1%D0%B5%D1%80%D0%B2%D0%B5%D1%80&template=new-server.yml"
    >
      Добавить сервер
    </UButton>
  </div>
</template>

<style scoped>

</style>