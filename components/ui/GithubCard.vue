<script setup lang="ts">
const props = defineProps<{
  github_id: number
  showId?: boolean
}>()

let userData = ref()
const updateData = async () => {
  const cacheKey = `github-avatar-${props.github_id}`
  const cachedData = sessionStorage.getItem(cacheKey)
  if (cachedData) userData.value = JSON.parse(cachedData)
  else {
    try {
      const resp: any = await $fetch(`https://api.github.com/user/${props.github_id}`)
      const data = {login: resp.login, avatar_url: resp.avatar_url, html_url: resp.html_url}
      sessionStorage.setItem(cacheKey, JSON.stringify(data))
      userData.value = data
    } catch {
      userData.value = null
    }
  }
}
watch(() => props.github_id, updateData)
onMounted(updateData)
</script>

<template>
  <div class="flex items-center justify-center gap-2" v-if="userData">
    <NuxtLink target="_blank" :to="userData.html_url" v-if="userData.avatar_url" class="flex">
      <NuxtImg :src="userData.avatar_url" class="w-10 h-10 rounded-2" />
    </NuxtLink>

    <div class="flex flex-col gap-1">
      <b>{{ userData.login }}</b>
      <pre v-if="showId" class="m-0">ID: {{ github_id }}</pre>
    </div>
  </div>
  <pre v-else class="m-l-2 text-[16px]">{{ github_id }}</pre>
</template>

<style scoped lang="scss">

</style>