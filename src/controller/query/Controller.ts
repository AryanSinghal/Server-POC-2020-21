import { queryRepository } from '../../repositories';
import SystemResponse from '../../libs/SystemResponse';

class Controller {
  static instance: Controller;
  static getInstance = () => {
    return (Controller.instance)
      ? Controller.instance
      : new Controller();
  }
  create = async (req, res) => {
    const data = req.body;
    try {
      const response = await queryRepository.create(data);
      SystemResponse.success(res, response, 'Query Successfully uploaded');
    } catch (error) {
      SystemResponse.failure(res, error, error.msg);
    }
  }

  list = (req, res) => {
    const { skip = 0, limit = 10 } = req.query;
    console.log(skip, limit);
    res.send({ skip, limit })
  }

  delete = (req, res) => {
    const { id } = req.params;
    res.send({ id })
  }
}

export default Controller.getInstance();