import UserPerm from "~/server/models/UserPerm";
import type {UserSession} from "#auth-utils";

export default async function checkPerms(session: UserSession, serverName: string): Promise<boolean> {
    if (!session.user) return false

    const userPerm = await UserPerm.findOne(
        {github_id: session.user.id}
    ).catch()

    if (userPerm === null) return false

    return userPerm.perms.includes(serverName)
        || userPerm.perms.includes("*")
}