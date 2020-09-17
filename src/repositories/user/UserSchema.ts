import * as mongoose from 'mongoose';
import { VersionableSchema } from '../versionable';

class UserSchema extends VersionableSchema {
  constructor(options) {
    const userSchema = {
      id: String,
      name: String,
      email: String,
      password: String,
      role: String,
    };
    super(userSchema, options);
  }
}

export default UserSchema;
