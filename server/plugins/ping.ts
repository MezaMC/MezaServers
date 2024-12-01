import Server from "~/server/models/Server";
import {pingJava} from "@minescope/mineping";
import {toVersion} from "~/utils/protocolConverter";

export interface ServerLinks {
    discord?: string | null,
    telegram?: string | null,
    youtube?: string | null,
    site?: string | null
}

export interface ServerData {
    status: "active" | "frozen" | "maintenance" | "pending",
    online?: boolean
    ip: string
    port?: number
    version?: string,
    players?: {
        online?: number
        max?: number
    },
    links?: ServerLinks,
    display: {
        desc?: string | null,
        favicon?: string | null,
        name?: string | null
    },
    stars: number[]
}

async function pingServers() {
    const storage = useStorage("servers")

    return await Server.find().then(data => {

        data.forEach(async serverEntry => {
            if (!serverEntry.ip || !serverEntry.name) return

            const ip: string = serverEntry.ip
            const port: number = serverEntry.port || 25565
            const name: string = serverEntry.name

            let data: ServerData = {
                ip: `${ip}:${port}`,
                status: serverEntry.status || "active",
                links: serverEntry.links || undefined,
                stars: serverEntry.stars || [],
                display: serverEntry.display || {}
            }
            if (data.status === "active") {
                await pingJava(ip, { port }).then( resp => {
                    data.online = true
                    data.version = toVersion(resp.version.protocol)
                    if (!data.display.favicon) data.display.favicon = resp.favicon || '/pack.png'
                    data.players = {online: resp.players.online, max: resp.players.max}
                }).catch(() => {
                    data.online = false
                })
            }
            await storage.setItem(name, data)
        })

        console.log(`Servers pinged: ${data.length}`)

    }).catch(() => {
        console.error("Database issue")
    })

}

export default defineNitroPlugin((nitroApp) => {
    pingServers()
    // setInterval(pingServers, 5 * 60_000)
})
