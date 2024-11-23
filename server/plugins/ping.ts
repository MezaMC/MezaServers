import Server from "~/server/models/Server";
import {pingJava} from "@minescope/mineping";
import {toVersion} from "~/utils/protocolConverter";

export interface ServerData {
    status: "active" | "frozen" | "maintenance" | "pending",
    online?: boolean
    ip: string
    port?: number
    version?: string,
    favicon?: string,
    players?: {
        online?: number
        max?: number
    },
    links?: {
        discord?: string | null,
        telegram?: string | null,
        youtube?: string | null,
        site?: string | null
    },
    stars?: number[]
}

async function pingServers() {
    const storage = useStorage("servers")

    Server.find().then(data => {

        data.forEach(async serverEntry => {
            if (!serverEntry.ip || !serverEntry.name) return

            const ip: string = serverEntry.ip
            const port: number = serverEntry.port || 25565
            const name: string = serverEntry.name

            let data: ServerData = {
                ip: `${ip}:${port}`,
                status: serverEntry.status || "active",
                links: serverEntry.links || undefined,
                stars: serverEntry.stars || undefined
            }
            if (data.status === "active") {
                await pingJava(ip, { port }).then( resp => {
                    data.online = true
                    data.version = toVersion(resp.version.protocol)
                    data.favicon = resp.favicon
                    data.players = {online: resp.players.online, max: resp.players.max}
                    console.log(`Server ${name} is online`)
                }).catch(() => {
                    data.online = false
                    console.log(`Server ${name} is offline`)
                })
            } else {
                console.log(`Server ${name} is ${data.status}`)
            }
            await storage.setItem(name, data)
        })
    }).catch(() => {
        console.error("Database issue")
    })
}

export default defineNitroPlugin((nitroApp) => {

    pingServers()

    // setInterval(() => {
    //
    //
    //
    // }, 5 * 60_000)


})
