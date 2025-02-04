export default defineNuxtPlugin(async () => {
    // Ensure clientside
    // if (import.meta.server) return

    const adminState = useState<boolean>('isAdmin', () => false)
    adminState.value = await $fetch<boolean>("/api/perm/check/*")
})