import * as mongoose from 'mongoose';

export default interface IVersionableDocument extends mongoose.Document {
  originalId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  updatedBy: string;
  deletedBy: string;
}