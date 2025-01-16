import mongoose from 'mongoose';
import 'dotenv/config';

export default defineNitroPlugin(() => {
    const mongoURI = process.env.MONGODB_URI;

    if (mongoURI === undefined) {
        console.error("MongoDB connection string not loaded")
        return
    }

    if (!mongoose.connection.readyState) {
        mongoose.connect(mongoURI).then(() => {
            console.log('Connected to MongoDB');
        }).catch(() => {
            console.error('Not connected to MongoDB');
        });
    }
});