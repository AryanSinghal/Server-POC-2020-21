import * as mongoose from 'mongoose';
import UserSchema from './UserSchema';
import IUserModel from './IUserModel';

const toConvert = {
  transform: (docs: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
};


export const userSchema = new UserSchema({
  collection: 'User',
  toJSON: toConvert,
  toObject: toConvert,
});

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema, 'User', true);
