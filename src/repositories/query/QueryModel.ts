import * as mongoose from 'mongoose';
import QuerySchema from './QuerySchema';
import IQueryModel from './IQueryModel';

const toConvert = {
  transfers: (docs: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
};

export const querySchema = new QuerySchema({
  collection: 'Query',
  toJSON: toConvert,
  toObject: toConvert,
});

export const queryModel: mongoose.Model<IQueryModel> = mongoose.model<IQueryModel>('Query', querySchema, 'Queries', true);
