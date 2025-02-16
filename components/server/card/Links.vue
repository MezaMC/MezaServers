<script setup lang="ts">
const serverData = inject<Ref<ServerData>>("server")!

const displayData: {
  [key: string]: {
    icon: string,
    display: string
  }
} = {
  discord: {
    icon: 'tabler:brand-discord',
    display: 'Discord сервер'
  },
  telegram: {
    icon: 'tabler:brand-telegram',
    display: 'Telegram канал'
  },
  youtube: {
    icon: 'tabler:brand-youtube',
    display: 'YouTube канал'
  },
  site: {
    icon: 'lucide:globe',
    display: 'Сайт'
  },
  donate: {
    icon: 'lucide:wallet',
    display: 'Поддержать'
  }
}
</script>

<template>
  <div class="flex items-center flex-wrap gap-[0.5rem_1.25rem]" v-if="serverData.links">
    <template v-for="(link, linkName) of serverData.links">

      <a v-if="link && linkName in displayData" :href="link" target="_blank"
         class="cursor-pointer flex items-center gap-1">
        <NuxtIcon :name="displayData[linkName].icon" />
        {{ displayData[linkName].display }}
      </a>

    </template>
  </div>
</template>