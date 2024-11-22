export default defineEventHandler(async event => {
    const session = await getUserSession(event)

    if (session.user) {
        return "auth yes"
    } else {
        return "auth no"
    }

})