import { queryRepository } from '../../repositories';

class Controller {
  static instance: Controller;
  static getInstance = () => {
    return (Controller.instance)
      ? Controller.instance
      : new Controller();
  }
  create = async (req, res) => {
    const data = req.body;
    const response = await queryRepository.create(data);
    console.log(response);
    res.send({ success: "ok", response });
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