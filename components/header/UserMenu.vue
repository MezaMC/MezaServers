<script setup lang="ts">
import UButton from "~/components/ui/UButton.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isOpen = ref(false);
const toggleDropdown = () => isOpen.value = !isOpen.value;

onMounted(() => document.addEventListener('click', event => {
  if (event.target == null) return
  if (!(event.target instanceof Element)) return
    if (!event.target.closest('.dropdown')) isOpen.value = false
}))
onBeforeUnmount(() => document.removeEventListener('click', () => {}))
const adminState = useState<boolean>('isAdmin', () => false)
</script>

<template>
  <AuthState v-slot="{ loggedIn, clear, user }">
    <template v-if="loggedIn && user">

      <div class="dropdown">
        <transition>
          <div v-if="isOpen" class="dropdown-container flex flex-col">

            <UButton
                router-link="/admin/perms"
                type="link"
                icon="lucide:user-cog"
                v-if="adminState"
                @click="isOpen = false"
            >Панель прав</UButton>

            <UButton
                @click="clear"
                type="link"
                icon="lucide:log-out"
            >Выйти</UButton>

          </div>
        </transition>
        <UButton
            type="link"
            :img="`https://avatars.githubusercontent.com/u/${user.id}?v=4`"
            @click="toggleDropdown"
            class="important:lt-phone:(p-l-2 p-r-2)"
        >
          {{ user.login }} <NuxtIcon name="lucide:chevron-down" />
        </UButton>
      </div>
    </template>

    <UButton v-else href="/auth/github" type="link" icon="lucide:log-in">
      <span>Войти
        <span class="lt-phone:hidden"> через GitHub</span>
      </span>
    </UButton>

  </AuthState>
</template>

<style scoped lang="scss">
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-container {
  background-color: var(--c-bg-main);
  outline: 1px solid var(--c-sep);
  border-radius: 4px;
  position: absolute;
  top: 120%;
  right: 0;
  padding: 10px;
  z-index: 10;
  box-shadow: var(--c-shadow) 0 0 16px;
  width: max-content;
  > * {
    @apply min-w-full box-border;
  }
}

.v-enter-active,
.v-leave-active {
  top: 120%;
  transition: opacity 0.1s ease-in-out, top 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  top: 80%;
}
</style>
