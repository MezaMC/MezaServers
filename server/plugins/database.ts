import mongoose from 'mongoose';

export default defineNitroPlugin(() => {
    const mongoURI = process.env.MONGODB_URI;

    if (mongoURI === undefined) return

    if (!mongoose.connection.readyState) {
        mongoose.connect(mongoURI).then(() => {
            console.log('Connected to MongoDB');
        }).catch(() => {
            console.log('Not connected to MongoDB');
        });
    }
});