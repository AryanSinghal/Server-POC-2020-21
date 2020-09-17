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
      console.log({ email, password });
      const user = await userRepository.findOne({ email });
      console.log(user)
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

}

export default Controller.getInstance();