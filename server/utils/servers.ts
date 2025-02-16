import Server from "~/server/models/Server";
import {pingJava} from "@minescope/mineping";
import {toVersion} from "~/server/utils/protocolConverter";
import {resolveDomain} from "~/server/utils/domainResolver";

export interface ServerLinks {
    discord?: string | null,
    telegram?: string | null,
    youtube?: string | null,
    site?: string | null,
    donate?: string | null
}

export interface ServerDisplay {
    name?: string | null
    desc?: string | null
    favicon?: string | null
}

export type ServerStatus = "active" | "frozen" | "maintenance"

export interface ServerData {
    name: string
    status: ServerStatus
    online?: boolean
    ip: string
    port?: number
    desc?: string
    version?: string
    players?: {
        online?: number
        max?: number
    },
    links?: ServerLinks
    display: ServerDisplay
    stars: number[]
    images?: string[]
}

// Fetch servers from database and ping every active server
// then save them to nitro storage
export async function updateServersData() {
    const readyServersData: { [name: string]: ServerData } = {}

    try {
        const serversData = await Server.find()

        for (let serverEntry of serversData) {
            if (!serverEntry.ip || !serverEntry.name) return

            const ip: string = serverEntry.ip
            const name: string = serverEntry.name
            const port: number | undefined = serverEntry.port ?? undefined

            let data: ServerData = {
                name, ip, port,
                status: serverEntry.status ?? "active",
                desc: serverEntry.desc ?? undefined,
                links: serverEntry.links ?? undefined,
                stars: serverEntry.stars ?? [],
                display: serverEntry.display ?? {},
                images: serverEntry.images ?? undefined
            }
            if (data.status === "active") {
                const { ip: resolvedIp, port: resolvedPort } = await resolveDomain(ip, port ?? 25565)

                await pingJava(resolvedIp, { port: resolvedPort, virtualHost: ip, protocolVersion: 769 }).then(resp => {
                    data.online = true
                    data.version = toVersion(resp.version.protocol)
                    if (!data.display.favicon) data.display.favicon = resp.favicon ?? undefined
                    data.players = {online: resp.players.online, max: resp.players.max}
                }).catch(() => {
                    data.online = false
                })
            }
            readyServersData[name] = data
        }
    } catch (error) {
        console.error("Failed to fetch servers:", error)
    }

    // Clean storage and write new data to ip
    // serversStorage.clean() not working somewhy
    const serversStorage = useStorage("servers")
    for (let key of await serversStorage.getKeys()) {
        await serversStorage.removeItem(key)
    }
    for (const [name, data] of Object.entries(readyServersData)) {
        await serversStorage.setItem(name, data)
    }
}