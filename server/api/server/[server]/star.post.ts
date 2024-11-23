import Server from "~/server/models/Server";
import {ServerData} from "~/server/plugins/ping";

export default defineEventHandler(async (event) => {

    const session = await getUserSession(event)
    const body = await readBody(event)
    const serverName = event.context.params?.server as string
    const storage = useStorage("servers")

    if (!session.user) return {"error": "not logged in"}
    const userId = session.user.id

    const serverEntry = await Server.findOne({name: serverName})

    if (!serverEntry) return {"error": "server not found"}
    if (!serverEntry.stars) serverEntry.stars = []

    if (body.act === "add") {
        if (serverEntry.stars.includes(userId)) return {"error": "already starred"}
        serverEntry.stars.push(userId)
    } else if (body.act === "remove") {
        if (!serverEntry.stars.includes(userId)) return {"error": "not starred"}
        serverEntry.stars = serverEntry.stars.filter(it => it != userId)
    } else
        return {"error": "pass \"act\" key with \"add\" or \"remove\" value in request body"}

    const storageData: ServerData | null = await storage.getItem(serverName)
    if (storageData) {
        storageData.stars = serverEntry.stars
        await storage.setItem(serverName, storageData)
    }

    await serverEntry.save()
    return {"ok": "sucess"}
})