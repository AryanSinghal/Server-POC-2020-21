import * as mongoose from 'mongoose';
import logger from '../../libs/logger';

export default class VersioningRepository<D extends mongoose.Document> {
  public versionModel;
  constructor(versionModel) {
    this.versionModel = versionModel;
  }

  public create(document) {
    const id = VersioningRepository.generateObjectId();
    return this.versionModel.create({
      ...document,
      _id: id,
      originalId: id,
      createdAt: Date.now(),
    });
  }

  public list(query, projection, options) {
    return this.versionModel.find({ ...query, deletedAt: { $exists: false } }, projection, options);
  }

  public delete(query) {
    return this.versionModel.update({ ...query, deletedAt: { $exists: false } }, { deletedAt: new Date() });
  }

  public cronUpdate(query, document) {
    return this.versionModel.updateMany(query, document);
  }

  public async update(condition, updatedData, options) {
    const session = await this.versionModel.startSession();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    };
    try {
      await session.withTransaction(async () => {
        const oldData: any = await this.versionModel.findOne({ ...condition, deletedAt: { $exists: false } });
        if (!oldData) {
          throw Error('Data does not exist');
        }
        const { name, email, mob, query, comment, originalId, resolved } = oldData;
        Promise.all([
          this.versionModel.create({
            comment, resolved, ...updatedData, name, email, mob, query, originalId, updatedAt: Date.now(),
          }),
          this.versionModel.update(
            { ...condition, deletedAt: { $exists: false } },
            { deletedAt: new Date() }
          )
        ]);
      }, transactionOptions);
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      logger.error(`abort due to ${err}`)
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  public static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }

  public aggregate(pipeline) {
    return this.versionModel.aggregate(pipeline);
  }
}
