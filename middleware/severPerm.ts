export default defineNuxtRouteMiddleware(async (to, from) => {
    // Ensure clientside
    if (import.meta.server) return

    const serverId = to.params.server as string | undefined
    if (!serverId) return

    const { checkPerm } = useUserPerms()

    if (!checkPerm(serverId).value) {
        return navigateTo('/')
    }
});