import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import { VersioningRepository } from '../versionable';

class UserRepository extends VersioningRepository<IUserModel> {
  protected userModel: mongoose.Model<IUserModel>;
  constructor() {
    super(userModel);
  }

  create = (data) => {
    return super.create(data);
  }

  update = (condition, updatedData, options = {}) => {
    return super.update(condition, updatedData, options);
  }

  count = (query = {}) => {
    return this.versionModel.countDocuments({ ...query, deletedAt: { $exists: false } });
  }

  findOne = (query, projection = {}, options = {}) => {
    return this.versionModel.findOne({ ...query, deletedAt: { $exists: false } }, projection, options);
  }
}

export default new UserRepository();
