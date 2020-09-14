import * as mongoose from 'mongoose';
import Database from '../../libs/Database';

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
    return this.versionModel.find(query, projection, options);
  }

  public delete(query) {
    return this.versionModel.update({ ...query, deletedAt: { $exists: false } }, { deletedAt: new Date() });
  }

  public async update(condition, updatedData, options) {
    const session = await this.versionModel.startSession({ writeConcern: { w: 1 } });
    session.startTransaction();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    };
    try {
      await session.withTransaction(async () => {
        const oldData: any = await this.versionModel.findOne({ ...condition, deletedAt: { $exists: false } });
        const { name, email, mob, query, comment, originalId, resolved } = oldData;
        // await this.versionModel.create({
        //   comment, resolved, ...updatedData, name, email, mob, query, originalId, updatedAt: Date.now(),
        // })
        // throw new Error('transaction check')
        // await this.versionModel.update(
        //   { ...condition, deletedAt: { $exists: false } },
        //   { deletedAt: new Date() }
        // )
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
      console.log('abort')
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  public static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }

  // public async cronUpdate(query, document): Promise<D> {
  //   return versionmodel.updateMany(query, document);
  // }
}
