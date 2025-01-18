import mongoose from 'mongoose';

export default defineNitroPlugin(() => {
    const config = useRuntimeConfig()
    const mongoURI = config.MONGODB_URI

    if (mongoURI === undefined || mongoURI === "") {
        console.error("MongoDB connection string not loaded")
        return
    }

    if (!mongoose.connection.readyState) {
        console.log("uri: " + mongoURI)
        mongoose.connect(mongoURI).then(() => {
            console.log('Connected to MongoDB')
        }).catch(() => {
            console.error('Not connected to MongoDB')
        });
    }
});