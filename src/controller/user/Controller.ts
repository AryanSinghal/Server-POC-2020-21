import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import { userRepository } from '../../repositories';
import SystemResponse from '../../libs/SystemResponse';
import logger from '../../libs/logger';

class Controller {
  static instance: Controller;
  static getInstance = () => {
    return (Controller.instance)
      ? Controller.instance
      : new Controller();
  }

  login = async (req, res) => {
    logger.info('---------Login----------');
    try {
      const { email, password } = req.body;
      const user = await userRepository.findOne({ email });
      if (!user) {
        return SystemResponse.failure(res, 'User data not found', 'User not found', 404);
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        return SystemResponse.failure(res, 'Password is incorrect', 'Password does not match', 422);
      }
      logger.info('Password matched');
      const token = jwt.sign({ email: user.email, id: user.originalId }, config.key, { expiresIn: 900 });
      return SystemResponse.success(res, token);
    } catch (ex) {
      SystemResponse.failure(res, ex, ex.message);
    }
  }

  updatePassword = async (req, res) => {
    logger.info('---------Update----------');
    try {
      const { email, oldPassword, newPassword } = req.body;
      console.log({ email, oldPassword, newPassword });
      const user = await userRepository.findOne({ email });
      if (!user) {
        return SystemResponse.failure(res, 'User data not found', 'User not found', 404);
      }
      const result = await bcrypt.compare(oldPassword, user.password);
      if (!result) {
        return SystemResponse.failure(res, 'Password is incorrect', 'Password does not match', 422);
      }
      const hash = await bcrypt.hash(newPassword, 10);
      const resp = await userRepository.update({ email }, { password: hash });
      logger.info('Password Updated');
      return SystemResponse.success(res, 'Password Updated Successfully');
    } catch (ex) {
      SystemResponse.failure(res, ex, ex.message);
    }
  }
}

export default Controller.getInstance();