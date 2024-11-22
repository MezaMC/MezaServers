<script setup lang="ts">

const { data } = await useFetch('/api/servers')
const { loggedIn, user, clear } = useUserSession()

</script>

<template>
  View all servers
  <pre v-for="serverEntry in data">
    {{ serverEntry }}
  </pre>

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