import * as bcrypt from 'bcrypt';
import userRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';
import logger from './logger';

const seedData = async () => {
  const user = {
    name: 'Aryan Singhal',
    email: 'aryan.singhal@successive.tech',
    role: 'admin'
  };

  try {
    const count = await userRepository.count();
    if (count === 0) {
      const { password } = config;
      const hash = await bcrypt.hash(password, 10);
      userRepository.create({ ...user, password: hash });
      logger.info('Data seeded');
    }
    else
      logger.info(`Data is already seeded`);
  } catch (err) {
    throw err;
  }
};

export default seedData;
