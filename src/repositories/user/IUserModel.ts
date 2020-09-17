import { IVersionableDocument } from '../versionable';

export default interface IUserModel extends IVersionableDocument {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
