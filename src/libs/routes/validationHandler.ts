import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export default (config) => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info('---------Validation Handler---------');
    logger.info(config);
    logger.info(req.body);
    const err = [];
    Object.keys(config).forEach(key => {
      logger.info(`---------${key}---------`);
      const { errorMessage } = config[key];
      const { in: reqType } = config[key];
      reqType.forEach(reqMethod => {
        const keyValue = req[reqMethod][key];
        if (config[key].required === true) {
          if (keyValue === undefined || keyValue === null) {
            const obj = {
              location: `${reqMethod}`,
              msg: `${errorMessage}`,
              param: `${key}`,
              value: `${keyValue}`
            };
            obj[reqMethod] = obj.param;
            delete obj.param;
            err.push(obj);
          }
          if (config[key].regex !== undefined) {
            const { regex } = config[key];
            if (!regex.test(keyValue)) {
              const obj = {
                location: `${reqMethod}`,
                msg: `${key} is invalid`,
                param: `${key}`,
                value: `${keyValue}`
              };
              obj[reqMethod] = obj.param;
              delete obj.param;
              err.push(obj);
            }
          }
        }
        else {
          if (config[key].regex !== undefined && keyValue !== undefined) {
            logger.info('inside regex');
            const { regex } = config[key];
            if (!regex.test(keyValue)) {
              const obj = {
                location: `${reqMethod}`,
                msg: `${key} is invalid`,
                param: `${key}`,
                value: `${keyValue}`
              };
              obj[reqMethod] = obj.param;
              delete obj.param;
              err.push(obj);
            }
          }
        }
        if (config[key].custom !== undefined)
          if (config[key].custom(reqMethod, req, res, next)) {
            const obj = {
              location: `${reqMethod}`,
              msg: `${errorMessage}`,
              param: `${key}`,
              value: `${keyValue}`
            };
            obj[reqMethod] = obj.param;
            delete obj.param;
            err.push(obj);
          }
      });
    });
    if (err.length === 0) {
      return next();
    }
    else {
      const error = {
        message: 'Error Occurred',
        status: 400,
        error: err,
      };
      logger.error(error);
      return next(error);
    }
  };
};
