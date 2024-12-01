<script setup lang="ts">
const props = defineProps<{
  to?: string
  href?: string
  icon?: string
  type?: 'link' | 'outline'
  color?: string
  img?: string
  size?: string
}>()
const slots = useSlots()
const padding = slots['default'] === undefined ? "0.5rem" : "0.5rem 0.8rem"
var redirecting = false;
function handleClick() {
  if (props.href != undefined && !redirecting) {
    window.location.href = props.href
    redirecting = true
  }
}
</script>

<template>
  <div @click="handleClick()" :class="{
    'type-outline': type === 'outline',
    'type-link': (type || 'link') === 'link'}"
  >
<!--    <client-only>-->
    <img :src="img" v-if="img" alt="img" class="w-5 h-5 rounded-full">
    <NuxtIcon v-if="icon" :name="icon" class="w-5 h-5" />
<!--    </client-only>-->

    <slot />
  </div>
</template>

<style scoped lang="scss">
div {
  --color: var(--c-brand-3i); // default color
  --uno: "flex flex-row items-center gap-2 rounded cursor-pointer w-fit";
  padding: v-bind(padding);
  color: rgb(var(--color));
  transition: 150ms ease-in-out;
}

.type-outline {
  --opacity-outline: .5;
  --opacity-bg: .06;
  outline: 1px solid rgba(var(--color), var(--opacity-outline));
  background-color: rgba(var(--color), var(--opacity-bg));
  &:hover {
    --opacity-outline: .7;
    --opacity-bg: .1;
  }
  &:active {
    --opacity-outline: 1;
    --opacity-bg: .16;
    color: color-mix(in srgb, rgb(var(--color)), white 40%);
  }
}

.type-link {
  //text-decoration-line: underline;
  --opacity-underline: .25;
  text-decoration-color: rgba(var(--color), var(--opacity-underline));
  &:hover {
    --opacity-underline: .5;
    background-color: rgba(var(--color), .1);
  }
  &:active {
    --opacity-underline: .75;
    color: color-mix(in srgb, rgb(var(--color)), white 40%);
    background-color: rgba(var(--color), .16);
  }
}
</style>