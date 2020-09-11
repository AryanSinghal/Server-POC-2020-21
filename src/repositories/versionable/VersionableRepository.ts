import * as mongoose from 'mongoose';

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
    const session = await this.versionModel.startSession();
    session.startTransaction();
    const oldData: any = await this.versionModel.findOne({ ...condition, deletedAt: { $exists: false } });
    const { name, email, mob, query, comment, originalId, resolved } = oldData;
    Promise.all([
      this.versionModel.create({
        comment, resolved, ...updatedData, name, email, mob, query, originalId, updatedAt: Date.now(),
      }),
      this.versionModel.update(
        { ...query, deletedAt: { $exists: false } },
        { deletedAt: new Date() }
      )
    ]);
    await session.commitTransaction();
    session.endSession();
  }

  public static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }

  // public async cronUpdate(query, document): Promise<D> {
  //   return versionmodel.updateMany(query, document);
  // }
}
