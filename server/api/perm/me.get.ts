export default defineEventHandler(async (event) => {

    const session = await getUserSession(event)
    if (!session.user) return []

    const permsStorage = useStorage("perms")

    return await permsStorage.getItem(session.user.id.toString())

})