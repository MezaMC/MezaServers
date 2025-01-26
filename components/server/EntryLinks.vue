<script setup lang="ts">

import type {ServerLinks} from "~/server/plugins/ping";

const props = defineProps<{
  links?: ServerLinks
}>();

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
  <div class="flex items-center flex-wrap gap-[0.5rem_1.25rem]" v-if="links">
    <template v-for="(link, linkName) of links">

      <a v-if="link && linkName in displayData" :href="link" target="_blank"
         class="cursor-pointer flex items-center gap-1">
        <NuxtIcon :name="displayData[linkName].icon" />
        {{ displayData[linkName].display }}
      </a>

    </template>
  </div>
</template>