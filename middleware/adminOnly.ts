import {toast} from "vue-sonner";

export default defineNuxtRouteMiddleware((to, from) => {
    // Ensure clientside
    if (import.meta.server) return

    const adminState = useState<boolean>('isAdmin', () => false)

    if (!adminState.value) {
        return navigateTo('/')
    }
});