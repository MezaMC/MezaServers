import {useUserPerms} from "~/composables/useUserPerms";

export default defineNuxtRouteMiddleware((to, from) => {
    // Ensure clientside
    if (import.meta.server) return

    const { isAdmin } = useUserPerms()

    if (!isAdmin.value) {
        return navigateTo('/')
    }
});