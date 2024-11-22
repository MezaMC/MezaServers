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
        motds: [String],
        desc: String,
    },
    links: {
        youtube: String,
        discord: String,
        telegram: String,
        site: String
    },
    stars: {
        type: [String],
        required: false
    },
    status: {
        type: String,
        enum: ["active", "maintenance", "frozen", "pending"]
    }
}, { collection: 'servers' });

export default mongoose.model('Server', ServerSchema);