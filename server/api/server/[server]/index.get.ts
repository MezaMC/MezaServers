import {ServerData} from "~/server/utils/servers";
import {checkPerms} from "~/server/utils/perms";

export default defineEventHandler(async (event) => {

    const serverName = event.context.params?.server

    if (serverName === undefined)
        return {"status": "error", "message": "Имя сервера не может быть пустым"}

    const serverData = await useStorage<ServerData>("servers").getItem(serverName)

    if (!serverData) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Сервер не найден',
        })
    }

    return serverData

})