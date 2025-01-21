<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue";

useSeoMeta({ title: "О проекте" })
</script>

<template>

  <h1>О проекте</h1>

  <p>
    <span class="text-white">MezaServers</span> &ndash; мониторинг мистических серверов нового поколения.
    Ранее этот мониторинг существовал на MezaBook, но теперь это самостоятельный проект.
  </p>

  <p>
    Мониторинг не будет стоять на месте &ndash; я планирую расширять функционал и автоматизировать
    добавление/редактирование серверов.
  </p>

  <p>
    Создатель проекта - <a href="https://envizar.meza.one" target="_blank">envizar</a>, старожил мистического
    сообщества и начинающий Fullstack-разработчик. Его проекты создаются в первую очередь ради опыта и удовольствия,
    а не ради славы или заработка.
  </p>

  <div class="flex items-center justify-center w-full mt-8 gap-4 flex-wrap">
    <UButton type="outline" icon="tabler:brand-github" :target-blank="true" href="https://github.com/MezaMC/MezaServers">
      GitHub
    </UButton>

    <UButton type="outline" icon="tabler:brand-telegram" :target-blank="true" href="https://t.me/meza_inc">
      Telegram
    </UButton>

    <UButton type="outline" icon="tabler:brand-discord" :target-blank="true" href="https://ds.meza.one">
      Discord
    </UButton>
  </div>

</template>