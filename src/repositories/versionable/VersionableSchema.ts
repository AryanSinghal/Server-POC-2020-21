import * as mongoose from 'mongoose';

export default class VersionableSchema extends mongoose.Schema {
    constructor(querySchema, options) {
        const versionSchema = {
            originalId: String,
            createdAt: Date,
            updatedAt: { type: Date, default: Date.now() },
            deletedAt: Date,
            updatedBy: String,
            deletedBy: String,
        };
    super({ ...querySchema, ...versionSchema}, options);
    }
}