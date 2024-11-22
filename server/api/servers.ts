import {ServerData} from "~/server/plugins/ping";

export default defineEventHandler(async (event) => {

    const storage = useStorage("servers")
    const serverDataMap: { [key: string]: ServerData } = {}

    const servers = await storage.getKeys()
    for (const serverName of servers) {
        const serverData: ServerData | null = await storage.getItem(serverName)
        if (serverData == null) continue
        serverDataMap[serverName] = serverData
    }
    return serverDataMap


    // storage.getKeys().then(data => {
    //     return data
    // })

})