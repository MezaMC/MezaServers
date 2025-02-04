import {ServerData} from "~/server/utils/servers";
import {checkPerms} from "~/server/utils/perms";

export default defineEventHandler(async (event) => {

    const serverName = event.context.params?.server

    if (serverName === undefined) {
        return {"error": "blank"}
    }

    const serverData = await useStorage<ServerData>("servers").getItem(serverName)

    if (!serverData) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Server not found',
        })
    }

    return serverData

})