export default defineEventHandler(async (event) => {

    const session = await getUserSession(event)
    if (!session.user) return {"error": "not logged in"}

    const hasPerm = await checkPerms(session, "*")
    if (!hasPerm) return {"error": "no perms"}

    const permsStorage = useStorage("perms")

    const res: {[github_id: string]: string[] } = {}
    for (let key of await permsStorage.getKeys()) {
        res[key as string] = await permsStorage.getItem(key) as string[]
    }

    return res

})