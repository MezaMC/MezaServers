import {checkPerms} from "~/server/utils/perms";
import UserPerm from "~/server/models/UserPerm";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const session = await getUserSession(event)
    if (!session.user) return {"error": "not logged in"}

    const hasPerm = await checkPerms(session, "*")
    if (!hasPerm) return {"error": "no perms"}

    const userGithubId = body.github_id as number
    if (!userGithubId) return {"error": "provide userGithubId: number"}

    const permsStorage = useStorage("perms")

    if (body.act === "edit") {
        const perms = body.perms as string[]
        if (!perms) return {"error": "provide perms: string[]"}

        const permEntry = await UserPerm.findOne({github_id: body.github_id})
        if (!permEntry) return {"error": "user not found"}

        permEntry.perms = perms
        permEntry.save()

        await permsStorage.setItem(userGithubId.toString(), perms)
    }
    else if (body.act === "add") {
        const perms = body.perms as string[]
        if (!perms) return {"error": "provide perms: string[]"}

        const permEntry = await UserPerm.findOne({github_id: body.github_id})
        if (permEntry) return {"error": "user exists"}

        await UserPerm.create({ github_id: userGithubId, perms })

        await permsStorage.setItem(userGithubId.toString(), perms)
    }
    else if (body.act === "delete") {
        const permEntry = await UserPerm.findOne({github_id: body.github_id})
        if (!permEntry) return {"error": "user not found"}

        await UserPerm.deleteOne({github_id: body.github_id})

        await permsStorage.removeItem(userGithubId.toString())
    }
    else
        return {"error": "provide act: edit | add | delete"}

    return {"status": "ok"}

})