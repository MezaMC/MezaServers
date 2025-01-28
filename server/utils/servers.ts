import Server from "~/server/models/Server";
import {pingJava} from "@minescope/mineping";
import {toVersion} from "~/server/utils/protocolConverter";

export interface ServerLinks {
    discord?: string | null,
    telegram?: string | null,
    youtube?: string | null,
    site?: string | null,
    donate?: string | null
}

export type ServerStatus = "active" | "frozen" | "maintenance"

export interface ServerData {
    status: ServerStatus,
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
    stars: number[],
    images?: string[],

    // Used only when requesting /api/server/:serverName/
    // to display edit server elements
    hasPerms?: boolean
}

// Fetch servers from database and ping every active server
// then save them to nitro storage
export async function updateServersData() {
    const storage = useStorage("servers")
    try {
        const serversData = await Server.find()

        for (let serverEntry of serversData) {
            if (!serverEntry.ip || !serverEntry.name) return

            const ip: string = serverEntry.ip
            const name: string = serverEntry.name
            const port: number | undefined = serverEntry.port ?? undefined

            let data: ServerData = {
                ip: (!port) ? ip : `${ip}:${port}`,
                status: serverEntry.status ?? "active",
                links: serverEntry.links ?? undefined,
                stars: serverEntry.stars ?? [],
                display: serverEntry.display ?? {},
                images: serverEntry.images ?? undefined
            }
            if (data.status === "active") {
                await pingJava(ip, {port: port ?? 25565}).then(resp => {
                    data.online = true
                    data.version = toVersion(resp.version.protocol)
                    if (!data.display.favicon) data.display.favicon = resp.favicon ?? '/pack.png'
                    data.players = {online: resp.players.online, max: resp.players.max}
                }).catch(() => {
                    data.online = false
                })
            }
            await storage.setItem(name, data)
        }
    } catch (error) {
        console.error("Failed to fetch servers:", error)
    }
}
