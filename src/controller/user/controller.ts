import { queryRepository } from '../../repositories';
import SystemResponse from '../../libs/SystemResponse';
import logger from '../../libs/logger';

class Controller {
  static instance: Controller;
  static getInstance = () => {
    return (Controller.instance)
      ? Controller.instance
      : new Controller();
  }

  login = (req, res) => {
    logger.info('---------Login----------');
    const { email, password } = req.body;
    console.log({ email, password });
    res.send({ status: 'ok', email, password });
  }

}

export default Controller.getInstance();