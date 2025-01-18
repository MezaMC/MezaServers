import mongoose from 'mongoose';

export default defineNitroPlugin(nitroApp => {
    const config = useRuntimeConfig()
    const MONGODB_URI = config.MONGODB_URI

    if (MONGODB_URI === undefined || MONGODB_URI === "") {
        console.error("MongoDB connection string not loaded")
        return
    }

    if (!mongoose.connection.readyState) {
        mongoose.connect(MONGODB_URI).then(() => {
            console.log('Connected to MongoDB')
        }).catch(() => {
            console.error('Not connected to MongoDB')
        });
    }
});