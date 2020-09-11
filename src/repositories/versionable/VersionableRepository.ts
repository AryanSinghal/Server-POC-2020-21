import * as mongoose from 'mongoose';

export default class VersioningRepository<D extends mongoose.Document> {
  private versionModel;
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

  public static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }

  // public async cronUpdate(query, document): Promise<D> {
  //   return versionmodel.updateMany(query, document);
  // }
}
