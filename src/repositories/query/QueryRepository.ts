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

  getPastData = (query, projection, options) => {
    const { skip, limit, sort } = options;
    const { email, search } = query;
    const pipeline = [
      {
        $match: {
          deletedAt: { $exists: false },
          email
        },
      },
      {
        $sort: sort,
      },
      {
        $project: projection,
      },
      {
        $facet: {
          totalCount: [
            {
              $count: 'count',
            },
          ],
          list: [
            {
              $sort: sort,
            },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      },
    ];
    return super.aggregate(pipeline);
  }
}

export default new QueryRepository();
