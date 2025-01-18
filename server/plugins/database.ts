import mongoose from 'mongoose';

export default defineNitroPlugin(() => {
    const config = useRuntimeConfig()
    const MONGODB_URI = config.MONGODB_URI

    console.log("!!! " + config.LOADED_MESSAGE)

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