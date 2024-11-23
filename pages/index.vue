<script setup lang="ts">

import ServerCard from "~/components/ServerCard.vue";

const { data } = await useFetch('/api/servers')
const { loggedIn, user, clear } = useUserSession()

async function refetch() {
  data.value = await $fetch('/api/servers')
}

</script>

<template>

<!--  <pre v-for="serverEntry in data">-->
<!--    {{ serverEntry }}-->
<!--  </pre>-->

  <div>
    <ServerCard
        :data="serverData"
        :name="serverName as string"
        :key="serverName"
        v-for="(serverData, serverName) in data"
        :viewer-id="user?.id"
        @update-stars="refetch()"
    />
  </div>

  <UButton
      v-if="!loggedIn"
      to="/auth/github"
      icon="i-simple-icons-github"
      label="Login with GitHub"
      color="black"
      size="xs"
      external
  />
  <div v-if="user">{{ user }}</div>
  <UButton @click="clear" label="logout" />
</template>

<style scoped>

</style>