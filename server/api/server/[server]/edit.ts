import UserPerm from "~/server/models/UserPerm";
import checkPerms from "~/utils/checkPerms";

export default defineEventHandler(async (event) => {

    const serverName = event.context.params?.server as string
    const session = await getUserSession(event)

    return await checkPerms(session, serverName)

})