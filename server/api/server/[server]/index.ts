export default defineEventHandler(async (event) => {

    const server = event.context.params?.server

    if (server === undefined) {
        return {"error": "blank"}
    }

    return await useStorage("servers").getItem(server).catch(() => {
        throw createError({
            statusCode: 404,
            statusMessage: 'Server not found',
        })
    })

})