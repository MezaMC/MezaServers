import UserPerm from "~/server/models/UserPerm";
import {UserSession} from "#auth-utils";

type PermRecords = {perms: string[], github_id: number}[]

export async function updatePermsData() {
    const storage = useStorage("perms")
    try {
        const permRecords = await UserPerm.find().lean() as PermRecords

        permRecords.forEach(permRecord => {
            storage.setItem(permRecord.github_id.toString(), permRecord.perms)
        })
    } catch (error) {
        console.error("Failed to fetch perms:", error)
        return
    }
}

export async function checkPerms(session: UserSession, serverName: string): Promise<boolean> {
    if (!session.user) return false
    const userId = session.user.id
    const permsStorage = useStorage("perms")
    await permsStorage.clear()

    const userPerms = await permsStorage.getItem(userId.toString()) as string[]
    if (!userPerms) return false

    return userPerms.includes(serverName)
        || userPerms.includes("*")
}