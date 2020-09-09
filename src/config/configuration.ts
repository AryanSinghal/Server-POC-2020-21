import { IConfig } from './IConfig';
import { config } from 'dotenv';

config();
const configuration: IConfig = {
    port : process.env.PORT,
    nodeEnv : process.env.NODE_ENV,
    key : process.env.SECRET_KEY,
    mongoUrl: process.env.MONGO_URL,
    password: process.env.PASSWORD,
};
Object.freeze(configuration);
export default configuration;
