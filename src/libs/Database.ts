import * as mongoose from 'mongoose';
import logger from './logger';
import seedData from './seedData';

export default class Database {
  static open = (mongoUrl) => {
    const promise = new Promise((resolve, reject) => {
      mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          reject(err);
        }
        logger.info(`Database Connected at : ${mongoUrl}`);
        seedData();
        resolve();
      });
    });
    return promise;
  }
  static disconnect = () => {
    mongoose.disconnect();
    logger.info('Database disconnected');
  };
}
