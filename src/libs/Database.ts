import * as mongoose from 'mongoose';
// import seedData from './seedData';

export default class Database {
  static open = (mongoUrl) => {
    const promise = new Promise((resolve, reject) => {
      mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          reject(err);
        }
        console.log('Database Connected at :', mongoUrl);
        // seedData();
        resolve();
      });
    });
    return promise;
  }
  static disconnect = () => {
    mongoose.disconnect();
    console.log('Database disconnected');
  };
}
