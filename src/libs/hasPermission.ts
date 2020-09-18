import { permissions } from './constant';
import logger from './logger';

export default function hasPermission(moduleName: string, role: string, permissionType: string): boolean {
  logger.info('hasPermission', moduleName, role, permissionType);
  if (permissions[moduleName] === undefined)
    return false;
  const data = permissions[moduleName];
  let tmp: boolean = false;
  if (data['all']) {
    return true;
  }
  if (data[permissionType] === undefined)
    return false;
  data.all.forEach(element => {
    if (element === role)
      tmp = true;
  });
  data[permissionType].forEach(element => {
    if (element === role) {
      tmp = true;
    }
  });
  return tmp;
}
