import mongoose from 'mongoose';

export default defineNitroPlugin(nitroApp => {
    const config = useRuntimeConfig()
    const MONGODB_URI = config.MONGODB_URI

    if (MONGODB_URI === undefined || MONGODB_URI === "") {
        console.error("MongoDB connection string not loaded")
        return
    }

    // Connect to database
    if (!mongoose.connection.readyState) {
        mongoose.connect(MONGODB_URI).then(() => {
            console.log('Connected to MongoDB')
        }).catch(() => {
            console.error('Not connected to MongoDB')
        })
    }
    
    // Close connection
    nitroApp.hooks.hook('close', async () => {
        setTimeout(() => {
            mongoose.connection.close().then(() => {
                console.log('MongoDB connection closed')
            }).catch(error => {
                console.error('Error closing MongoDB connection:', error)
            })
        }, 2000)
    })
})