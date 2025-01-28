import {ServerData} from "~/server/utils/servers";

export default defineEventHandler(async (event) => {

    const storage = useStorage("servers")
    const serverDataMap: { [key: string]: ServerData } = {}

    const servers = await storage.getKeys()
    for (const serverName of servers) {
        const serverData = (await storage.getItem(serverName)) as (ServerData | null)
        if (serverData == null) continue
        serverDataMap[serverName] = serverData
    }

    return serverDataMap

})