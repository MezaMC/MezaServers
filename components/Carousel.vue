<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  images: string[]
}>()

const currentIndex = ref<number>(0);

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1)
    currentIndex.value++
}

const prevImage = () => {
  if (currentIndex.value > 0)
    currentIndex.value--
}
</script>

<template>
  <div
      class="flex flex-row gap-4 lt-sm:gap-0 items-center bg-bg-cardalt
      border-(1px solid sep) p-3 lt-sm:p-0 justify-between rounded-2"
  >

    <button
        :disabled="currentIndex === 0"
        @click="prevImage"
    >
      <NuxtIcon name="lucide:chevron-left" />
    </button>

    <NuxtImg
        :key="currentIndex"
        :src="images[currentIndex]"
        alt=""
        class="max-h-100 h-full max-w-150 w-full object-contain w-fit transition-all rounded-2 bg-bg-body"
    />

    <button
        :disabled="currentIndex === images.length - 1"
        @click="nextImage"
    >
      <NuxtIcon name="lucide:chevron-right" />
    </button>

  </div>
</template>

<style scoped lang="scss">
button {
  @apply "text-3xl flex items-center h-25 rounded-2 transition-all border-none cursor-pointer justify-center";
  @apply "lt-sm:(text-xl w-8)";

  background: rgba(var(--c-brand-3i), var(--bg-opacity));
  color: rgba(var(--c-brand-3i), var(--text-opacity));

  --bg-opacity: .06;
  --text-opacity: 1;

  &:disabled {
    --text-opacity: .3;
    --bg-opacity: .03;
    cursor: default;
  }
  &:not(:disabled) {
    &:hover {
      --bg-opacity: .1;
    }
    &:active {
      --bg-opacity: .14;
    }
  }

}
</style>
