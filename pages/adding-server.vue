<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue";

useSeoMeta({ title: "Добавление сервера" })
</script>

<template>

  <h1>Добавление сервера</h1>

  <p>
    Чтобы добавить сервер на мониторинг, необходимо открыть заявку в GitHub репозитории проекта.
    Сервер обязательно должен удовлетворять требованиям - платный хостинг и соответствие тематике.
  </p>

  <p>
    Это сделано для того, чтобы на мониторинг не попадали сервера со слишком низким качеством.
    Разумеется, создатель мониторинга не отслеживает качество каждого сервера, но моментальный отказ
    серверам на бесплатных хостингах отсеивает большинство низкокачественных проектов.
  </p>

  <div class="flex items-center justify-center w-full mt-8">
    <UButton type="outline" icon="lucide:file-plus-2" :target-blank="true"
             href="https://github.com/MezaMC/MezaServers/issues/new?labels=%D0%A1%D0%B5%D1%80%D0%B2%D0%B5%D1%80&template=new-server.yml"
    >
      Форма для добавления
    </UButton>
  </div>

</template>