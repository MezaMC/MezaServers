import {ServerData} from "~/server/utils/servers";
import Server from "~/server/models/Server";
import {checkPerms} from "~/server/utils/perms";
import {z} from "zod";
import DOMPurify from 'dompurify';

export default defineEventHandler(async (event) => {

    const session = await getUserSession(event)
    if (!session.user) return {"status": "error", "message": "Ошибка авторизации."}

    const serverName = event.context.params?.server as string
    const serverEntry = await Server.findOne({name: serverName})
    if (!serverEntry) return {"status": "error", "message": "Сервер не найден в базе данных."}

    const hasPerm = await checkPerms(session, serverName)
    if (!hasPerm) return {"status": "error", "message": "Недостаточно прав."}

    const changedData = (await readBody(event)).data

    const zLink = z.string().max(128)

    const validationSchema =  z.object({
        display: z.object({
            desc: z.string().max(256).optional(),
            name: z.string().max(64).optional(),
            favicon: zLink.optional()
        }).optional(),
        links: z.object({
            discord: zLink.optional(),
            telegram: zLink.optional(),
            youtube: zLink.optional(),
            site: zLink.optional(),
            donate:zLink.optional()
        }).optional(),
        ip: z.string().nonempty().max(64).optional(),
        port: z.coerce.number().min(0).max(65535).optional(),
        desc: z.string().max(2048).optional(),
        status: z.enum(["active", "frozen", "maintenance"]).optional(),
        images: z.array(zLink).max(16).optional()
    })

    let validatedData: {[key: string]: any}
    try {
        validatedData = validationSchema.parse(changedData)
    } catch {
        return {"status": "error", "message": "Неверные данные."}
    }

    const storage = useStorage("servers")
    const storageData = (await storage.getItem(serverName)) as ServerData | null
    if (!storageData) {
        return {"status": "error", "message": "Сервер не найден в storage."}
    }

    const newStorageData = storageData as any
    for (const key in validatedData) {
        newStorageData[key] = validatedData[key as keyof ServerData]
        serverEntry.set(key, validatedData[key as keyof ServerData])
    }

    await storage.setItem(serverName, newStorageData)
    await serverEntry.save()

    // $fetch(useRuntimeConfig().edits_webhook, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         content: `User: ${session.user.login}
    //         Server: ${serverName}
    //         Data:
    //         \`\`\`
    //         ${JSON.stringify(changedData)}
    //         \`\`\``,
    //     }),
    // })

    return {"status": "ok"}

    //     if (!["active", "frozen", "maintenance"].includes(body.status))
    //         return {"error": "unknown status"}
    //     serverEntry.status = body.status
    //
    //     // Update storage
    //     const storageData = (await storage.getItem(serverName)) as ServerData | null
    //     if (storageData) {
    //         storageData.status = serverEntry.status!
    //         await storage.setItem(serverName, storageData)
    //     } else {
    //         return {"error": "server not found in storage"}
    //     }
    //
    //
    //
    // // Update database & return OK
    // await serverEntry.save()
    // return {"resp": "ok"}

})