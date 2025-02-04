<script setup>
import { ref, onMounted } from 'vue'
import UButton from "~/components/ui/UButton.vue"
import {toast} from "vue-sonner";

const showBanner = ref(false)
const bannerId = 'p2g'

const checkBannerVisibility = () => {
  const lastClosed = localStorage.getItem(`${bannerId}-banner-closed`)
  if (lastClosed) {
    const closedTime = new Date(lastClosed)
    const currentTime = new Date()
    const differenceInDays = (currentTime - closedTime) / (1000 * 3600 * 24)
    if (differenceInDays < 14)
      showBanner.value = false
    else
      localStorage.removeItem(`${bannerId}-banner-closed`)
  } else
    showBanner.value = true
}

const closeBanner = () => {
  localStorage.setItem(`${bannerId}-banner-closed`, new Date().toISOString())
  showBanner.value = false
  toast.success("Объявление скрыто на 14 дней")
}

onMounted(checkBannerVisibility)
</script>

<template>
  <transition name="collapse">
    <div
        v-if="showBanner"
        class="w-full flex justify-between bg-bg-card rounded-2 p-(l-4 r-2 2) box-border banner
        border-(2 solid #FF86AB55) hover:border-#FF86AB99 transition"
    >
      <div class="flex items-center gap-3">
        <img src="/p2g-logo.svg" alt="p2g-logo" class="w-8 h-8" />
        <span>
          <b>Play2GO</b> &mdash; мощный и недорогой Minecraft/VDS хостинг.
          <NuxtLink to="https://p2g.meza.one" target="_blank">Перейти</NuxtLink>
        </span>
      </div>
      <UButton icon="lucide:x" @click="closeBanner()" class="w-6 h-5 close-button" />
    </div>
  </transition>
</template>

<style scoped lang="scss">
.banner {
  background: linear-gradient(
          60deg,
          #250107,
          #060404
  );
}

a {
  color: #FF86AB;
  text-decoration-color: #FF86AB55;
}

.close-button {
  --color: 255, 134, 171;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: transform 150ms ease-in-out, opacity 200ms ease-in-out;
}

.collapse-enter-from,
.collapse-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>