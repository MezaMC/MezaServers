import {updateServersData} from '~/server/utils/servers'
import {updatePermsData} from '~/server/utils/perms'
import registerDataUpdater from '~/server/utils/dataUpdater'

export default defineNitroPlugin(nitroApp => {
    registerDataUpdater(nitroApp, updateServersData, 5)
    registerDataUpdater(nitroApp, updatePermsData, 15)
})