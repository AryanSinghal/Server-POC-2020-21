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
    // return this.queryModel.create({ ...data, createdAt: Date.now() });
  }

  delete = (id) => {
    console.log(id);
    // return this.queryModel.update({ id }, { deleted: true });
    // return super.delete(id);
  }

  update = (id, updatedData) => {
    // return super.update(userId, id, updatedData);
  }

  count = (query = {}) => {
    // return this.versionModel.countDocuments({ ...query, deletedAt: { $exists: false } });
  }

  list = (query, projection, options) => {
    const { skip, limit } = options;
    return this.queryModel.find(query, projection).skip(Number(skip)).limit(Number(limit));
    // return super.list(query, projection, options);
  }
}

export default new QueryRepository();
