export const useUserPerms = () => {
    const userPerms = useState<string[]>('userPerms', () => [])

    const isAdmin = computed(() => {
        if (!userPerms.value) return false
        return userPerms.value.includes('*')
    })

    const checkPerm = (permString: string) => computed(() => {
        if (!userPerms.value) return isAdmin.value
        return userPerms.value.includes(permString) || isAdmin.value
    })

    return { userPerms, isAdmin, checkPerm }
};
