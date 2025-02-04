import {ServerData} from "~/server/utils/servers";
import Server from "~/server/models/Server";
import {checkPerms} from "~/server/utils/perms";

export default defineEventHandler(async (event) => {

    const session = await getUserSession(event)
    if (!session.user) return {"error": "not logged in"}

    const serverName = event.context.params?.server as string
    const serverEntry = await Server.findOne({name: serverName})
    if (!serverEntry) return {"error": "server not found in database"}

    const hasPerm = await checkPerms(session, serverName)
    if (!hasPerm) return {"error": "no perms"}

    const storage = useStorage("servers")

    const body = await readBody(event)
    if (body.act === "status") {

        if (!["active", "frozen", "maintenance"].includes(body.status))
            return {"error": "unknown status"}
        serverEntry.status = body.status

        // Update storage
        const storageData = (await storage.getItem(serverName)) as ServerData | null
        if (storageData) {
            storageData.status = serverEntry.status!
            await storage.setItem(serverName, storageData)
        } else {
            return {"error": "server not found in storage"}
        }

    }

    // Update database & return OK
    await serverEntry.save()
    return {"resp": "ok"}

})