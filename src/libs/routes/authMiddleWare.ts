import * as jwt from 'jsonwebtoken';
import { default as config } from '../../config/configuration';
import hasPermission from '../hasPermission';
import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import { userRepository } from '../../repositories';

const authMiddleWare = (module, permissionType) => async (req, res: Response, next: NextFunction) => {
  logger.info('------------AUTHMIDDLEWARE------------', module, permissionType);
  try {
    const token: string = req.headers.authorization;
    logger.info(`token: ${token}`);
    const { key } = config;
    const decodedUser = jwt.verify(token, key);
    if (!decodedUser) {
      return next({
        status: 403,
        error: 'Unauthorized Access',
        message: 'Unauthorized Access'
      });
    }
    const userData = await userRepository.findOne({ originalId: decodedUser.id }, { password: 0 });
    req.user = userData;
    const role = userData.role;
    if (!hasPermission(module, role, permissionType)) {
      logger.error(`${role} does not permission of ${permissionType}`);
      return next({
        status: 403,
        error: 'Unauthorized Access',
        message: 'Unauthorized Access'
      });
    }
    next();
  }
  catch (error) {
    const err = {
      status: 403,
      error: 'Unauthorized Access',
      message: error.message
    }
    logger.error(error);
    return next(err);
  }
};

export { authMiddleWare };
