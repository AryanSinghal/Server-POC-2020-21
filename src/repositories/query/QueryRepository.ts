import * as mongoose from 'mongoose';
import IQueryModel from './IQueryModel';
import { queryModel } from './QueryModel';
import { VersioningRepository } from '../versionable';

class QueryRepository extends VersioningRepository<IQueryModel> {
  protected queryModel: mongoose.Model<IQueryModel>;
  constructor() {
    super(queryModel);
  }

  create = (data) => {
    return super.create(data);
  }

  delete = (query) => {
    console.log(query);
    return super.delete(query);
  }

  update = (condition, updatedData, options = {}) => {
    return super.update(condition, updatedData, options);
  }

  count = (query = {}) => {
    return this.versionModel.countDocuments({ ...query, deletedAt: { $exists: false } });
  }

  list = (query = {}, projection = {}, options = {}) => {
    return super.list(query, projection, options);
  }
}

export default new QueryRepository();
