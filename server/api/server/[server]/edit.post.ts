import {ServerData, updateServerData} from "~/server/utils/servers";
import Server from "~/server/models/Server";
import {checkPerms} from "~/server/utils/perms";
import {z} from "zod";

export default defineEventHandler(async (event) => {

    const session = await getUserSession(event)
    if (!session.user) return createError({statusCode: 401, message: "Ошибка авторизации."})

    const serverName = event.context.params?.server as string
    const serverEntry = await Server.findOne({name: serverName})
    if (!serverEntry) return createError({statusCode: 404, message: "Сервер не найден."})

    const hasPerm = await checkPerms(session, serverName)
    if (!hasPerm) return createError({statusCode: 403, message: "Недостаточно прав."})

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
        port: z.coerce.number().min(0).max(65535).optional().nullable(),
        desc: z.string().max(2048).optional().nullable(),
        status: z.enum(["active", "frozen", "maintenance"]).optional(),
        images: z.array(zLink).max(16).optional().nullable()
    })

    let validatedData: {[key: string]: any}
    try {
        validatedData = validationSchema.parse(changedData)
    } catch {
        return createError({statusCode: 400, message: "Неверные данные."})
    }

    for (const key in validatedData)
        serverEntry.set(key, validatedData[key as keyof ServerData])

    // Update in database
    await serverEntry.save()

    // If status-related fields changed, refetch from db and ping. Else just update in storage
    const changedFields = new Set(Object.keys(validatedData))
    if (["ip", "port", "status"].some(field => changedFields.has(field))) {
        await updateServerData(serverName, 3000)
    } else {
        const storage = useStorage("servers")
        const storageData = (await storage.getItem(serverName)) as ServerData | null

        if (!storageData)
            return {"status": "error", "message": "Сервер не найден в storage."}

        const newStorageData = storageData as any
        for (const key in validatedData)
            newStorageData[key] = validatedData[key as keyof ServerData]

        await storage.setItem(serverName, newStorageData)
    }

    $fetch(useRuntimeConfig().edits_webhook, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            content: `User: ${session.user.login}
        Server: ${serverName}
        Data:
        \`\`\`
        ${JSON.stringify(changedData)}
        \`\`\``,
        }),
    }).catch()

    setResponseStatus(event, 200)
    return { message: "Данные были обновлены." }

})