import * as jwt from 'jsonwebtoken';
import { default as config } from '../../config/configuration';
import hasPermission from '../hasPermission';
import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
// import UserRepository from '../../repositories/user/UserRepository';
// import IUserModel from '../../repositories/user/IUserModel';

const authMiddleWare = (module, permissionType) => async (req, res: Response, next: NextFunction) => {
  console.log('------------AUTHMIDDLEWARE------------', module, permissionType);
  try {
    const token: string = req.headers.authorization;
    console.log(token);
    const { key } = config;
    const decodedUser = jwt.verify(token, key);
    if (!decodedUser) {
      console.log('decodedUser')
      return next({
        status: 403,
        error: 'Unauthorized Access',
        message: 'Unauthorized Access'
      });
    }
    console.log(decodedUser);
    // const userData = await UserRepository.findOne({originalId: decodedUser._id});
    // console.log(userData);
    // req.user = userData;
    const role = 'admin';
    if (!hasPermission(module, role, permissionType)) {
        console.log(`${ role } does not permission of ${ permissionType }`);
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
    logger.error(err)
    return next(err);
  }
};

export { authMiddleWare };
