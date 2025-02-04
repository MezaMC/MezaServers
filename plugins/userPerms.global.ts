export default defineNuxtPlugin(async () => {
    // Ensure clientside
    if (import.meta.server) return

    const { userPerms } = useUserPerms()
    userPerms.value = await $fetch<string[]>("/api/perm/me")
})