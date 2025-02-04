export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    const permString = event.context.params?.perm
    return session.user && permString && (await checkPerms(session, permString))
})