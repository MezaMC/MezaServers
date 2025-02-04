<script setup lang="ts">
const props = defineProps<{
  routerLink?: string
  href?: string
  icon?: string
  type?: 'link' | 'outline'
  color?: string
  img?: string
  size?: string
  targetBlank?: boolean
  inactive?: boolean
}>();

const slots = useSlots()
const padding = slots.default ? '0.5rem 0.8rem' : '0.5rem'
let redirecting = false

function handleClick() {
  if (props.inactive) return
  if (props.routerLink) {
    useRouter().push(props.routerLink)
    return
  }
  if (props.href && !redirecting) {
    if (props.targetBlank) {
      window.open(props.href, '_blank')
    } else {
      window.location.href = props.href
      redirecting = true
      setTimeout(() => redirecting = false, 5000)
    }
  }
}
</script>

<template>
  <div
      @click="handleClick"
      :class="{
      'type-outline': props.type === 'outline',
      'type-link': (props.type || 'link') === 'link',
      'inactive': props.inactive
    }"
  >
    <NuxtImg v-if="props.img" :src="props.img" alt="avatar" class="w-5 h-5 rounded-full" />
    <NuxtIcon v-if="props.icon" :name="props.icon" class="w-5 h-5" />
    <slot />
  </div>
</template>

<style scoped lang="scss">
div {
  --color: var(--c-brand-3i);
  --uno: "flex flex-row items-center gap-2 rounded cursor-pointer w-fit";
  padding: v-bind(padding);
  color: rgb(var(--color));
  transition: 150ms ease-in-out;
}

.type-outline {
  --opacity-outline: 0.3;
  --opacity-bg: 0.03;
  border: 1px solid rgba(var(--color), var(--opacity-outline));
  background-color: rgba(var(--color), var(--opacity-bg));

  &:hover {
    --opacity-outline: 0.4;
    --opacity-bg: 0.04;
  }

  &:active {
    --opacity-outline: 0.6;
    --opacity-bg: 0.08;
    color: color-mix(in srgb, rgb(var(--color)), white 40%);
  }
}

.type-link {
  --opacity-underline: 0.25;
  text-decoration-color: rgba(var(--color), var(--opacity-underline));

  &:hover {
    --opacity-underline: 0.5;
    background-color: rgba(var(--color), 0.1);
  }

  &:active {
    --opacity-underline: 0.75;
    color: color-mix(in srgb, rgb(var(--color)), white 40%);
    background-color: rgba(var(--color), 0.16);
  }
}

.inactive {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
