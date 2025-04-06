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
    name?: string
    desc?: string
    faviconData?: string
    favicon?: string
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

async function getServerNames(): Promise<Set<string> | null> {
    try {
        const serverEntries = await Server.find()
        return new Set(serverEntries
            .map(serverEntry => serverEntry.name)
            .filter(serverName => serverName != null))
    } catch {
        return null
    }
}

// Fetch servers from database and ping every active server
// then save them to nitro storage
export async function updateServersData() {
    const serverNames = await getServerNames()
    if (!serverNames) return
    const serversStorage = useStorage("servers")
    const serverNamesDeleted = (await serversStorage.getKeys()).filter(key => !serverNames.has(key))

    for (const key of serverNamesDeleted)
        await serversStorage.removeItem(key)

    for (const serverName of serverNames)
        await updateServerData(serverName)
}

export async function updateServerData(serverName: string, timeout: number = 5000) {
    const serversStorage = useStorage("servers")
    const serverData = await fetchServerData(serverName, timeout)
    if (!serverData) return
    await serversStorage.setItem(serverName, serverData)
}

async function fetchServerData(serverName: string, timeout: number): Promise<ServerData | null> {

    let serverData: ServerData

    try {
        const serverEntry = await Server.findOne({name: serverName})

        if (!serverEntry || !serverEntry.ip || !serverEntry.name) return null

        const name = serverEntry.name
        const ip = serverEntry.ip
        const port = serverEntry.port ?? undefined

        serverData = {
            name, ip, port,
            status: serverEntry.status ?? "active",
            desc: serverEntry.desc ?? undefined,
            links: serverEntry.links ?? undefined,
            stars: serverEntry.stars ?? [],
            display: {
                name: serverEntry.display?.name ?? undefined,
                desc: serverEntry.display?.desc ?? undefined,
                favicon: serverEntry.display?.favicon ?? undefined
            },
            images: serverEntry.images ?? undefined
        }

        // If server is active resolve address then ping
        if (serverData.status === "active") {
            const { ip: resolvedIp, port: resolvedPort } = await resolveDomain(ip, port ?? 25565)

            await pingJava(resolvedIp, { port: resolvedPort, virtualHost: ip, protocolVersion: 769, timeout }).then(resp => {
                serverData.online = true
                serverData.version = toVersion(resp.version.protocol)
                if (!serverData.display.favicon) serverData.display.faviconData = resp.favicon
                serverData.players = {online: resp.players.online, max: resp.players.max}
            }).catch(() => {
                serverData.online = false
            })
        }

        return serverData

    } catch (error) {
        console.error(`Failed to fetch server ${serverName}:`, error)
        return null
    }
}