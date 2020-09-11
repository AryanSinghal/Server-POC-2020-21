import * as mongoose from 'mongoose';
import { VersionableSchema } from '../versionable';

class QuerySchema extends VersionableSchema {
  constructor(options) {
    const querySchema = {
      id: String,
      name: String,
      email: String,
      mob: Number,
      query: String,
      comment: String,
      resolved: { type: Boolean, default: false }
    };
    super(querySchema, options);
  }
}

export default QuerySchema;
