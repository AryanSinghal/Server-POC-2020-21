import * as mongoose from 'mongoose';
import { VersionableSchema } from '../versionable';

class QuerySchema extends VersionableSchema {
    constructor(options) {
        const querySchema = {
            id: String,
            name: String,
            email: String,
            mob: Number,
            createdAt: Date,
            query: String
        };
        super(querySchema, options);
    }
}

export default QuerySchema;
