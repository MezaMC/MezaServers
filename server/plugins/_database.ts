import mongoose from 'mongoose'
import {sleep} from '~/server/utils/sleep'

export default defineNitroPlugin(nitroApp => {
    const config = useRuntimeConfig()
    const MONGODB_URI = config.MONGODB_URI

    if (!MONGODB_URI) {
        console.error("Failed to load MongoDB connection URI. ENV variable isn't set?")
        return
    }

    // Connect to database
    if (!mongoose.connection.readyState) {
        mongoose.connect(MONGODB_URI).then(() => {
            console.log('Connected to MongoDB')
        }).catch(error => {
            console.error('Failed to connect to MongoDB:', error)
        })
    }
    
    // Close connection
    nitroApp.hooks.hookOnce('close', async () => {
        await sleep(500)
        try {
            await mongoose.connection.close()
            console.log('MongoDB connection closed')
        } catch (error) {
            console.error('Failed to close MongoDB connection:', error)
            return
        }
    })
})