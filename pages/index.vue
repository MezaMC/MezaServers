<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

import ServerCard from "~/components/ServerCard.vue";
import UButton from "~/components/ui/UButton.vue";
import UDropdown from "~/components/ui/UDropdown.vue";

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

<!--  <div class="flex flex-row gap-4">-->
<!--    <UButton icon="lucide:star-off" type="outline" class="important-bg-transparent">Test button!</UButton>-->
<!--    <UButton type="outline" icon="lucide:star">Outline with icon</UButton>-->

<!--  </div>-->
</template>

<style scoped>

</style>