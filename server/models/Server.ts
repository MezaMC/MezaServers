import mongoose from 'mongoose';

const ServerSchema = new mongoose.Schema({
    name: String,
    ip: String,
    port: {
        type: Number,
        required: false
    },
    display: {
        name: String,
        desc: String,
        favicon: String
    },
    links: {
        youtube: String,
        discord: String,
        telegram: String,
        site: String,
        donate: String
    },
    desc: {
        type: String,
        required: false
    },
    stars: {
        type: [Number],
        required: false
    },
    status: {
        type: String,
        enum: ["active", "maintenance", "frozen"]
    },
    images: {
        type: [String],
        required: false
    }
}, { collection: 'servers' });

export default mongoose.model('Server', ServerSchema);