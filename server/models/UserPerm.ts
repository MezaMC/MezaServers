import mongoose from 'mongoose';

const UserPermSchema = new mongoose.Schema({
    github_id: Number,
    perms: [String]
}, { collection: 'perms' });

export default mongoose.model('UserPerm', UserPermSchema);