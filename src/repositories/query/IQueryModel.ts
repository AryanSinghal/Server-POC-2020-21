import * as mongoose from 'mongoose';
import { IVersionableDocument } from '../versionable';

export default interface IQueryModel extends IVersionableDocument {
  id: string;
  name: string;
  email: string;
  mob: number;
  query: string;
  comment: string;
  resolved: boolean;
}
