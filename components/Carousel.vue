<script setup lang="ts">
const props = defineProps<{
  images: string[]
}>()

import emblaCarouselVue from 'embla-carousel-vue'
const [emblaRef, emblaApi] = emblaCarouselVue({loop: false})

const canScrollNext = ref(false)
const canScrollPrev = ref(false)

const updateCanScroll = () => {
  canScrollNext.value = emblaApi.value?.canScrollNext() || false
  canScrollPrev.value = emblaApi.value?.canScrollPrev() || false
}

onMounted(() => {
  if (!emblaApi.value)
    return

  emblaApi.value?.on('init', updateCanScroll)
  emblaApi.value?.on('reInit', updateCanScroll)
  emblaApi.value?.on('select', updateCanScroll)
})

</script>

<template>
  <div
      class="flex flex-row gap-3 lt-sm:gap-0 items-center bg-bg-cardalt h-45vw max-h-100
      border-(1px solid sep) p-3 lt-sm:p-0 justify-between rounded-2 w-full box-border"
  >

    <button @click="emblaApi?.scrollPrev()" :disabled="!canScrollPrev">
      <NuxtIcon name="lucide:chevron-left" />
    </button>

    <div class="embla overflow-hidden max-h-100 h-full object-contain w-full flex rounded-2" ref="emblaRef">
      <div class="embla__container flex w-full h-full">
        <NuxtImg class="embla__slide flex-grow-1 shrink-0 basis-[100%] max-w-full" v-for="image of images" :src="image" />
      </div>
    </div>

    <button @click="emblaApi?.scrollNext()" :disabled="!canScrollNext">
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
