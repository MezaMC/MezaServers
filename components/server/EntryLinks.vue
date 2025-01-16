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
  <div class="flex items-center flex-wrap gap-[0.4rem_1.5rem]" v-if="links">
    <template v-for="(link, linkName) of links">

      <a v-if="link" :href="link" target="_blank">
        <NuxtIcon :name="displayData[linkName].icon" />
        {{ displayData[linkName].display }}
      </a>

    </template>
  </div>
</template>

<style scoped lang="scss">

a {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.24rem;
}

</style>