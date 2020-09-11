import { queryRepository } from '../../repositories';
import SystemResponse from '../../libs/SystemResponse';
import logger from '../../libs/logger';
import { searchQuery, sortQuery } from './helper';

class Controller {
  static instance: Controller;
  static getInstance = () => {
    return (Controller.instance)
      ? Controller.instance
      : new Controller();
  }
  create = async (req, res) => {
    logger.info('--------Create--------');
    try {
      const { name, email, mob, query } = req.body;
      const response = await queryRepository.create({ name, email, mob, query });
      SystemResponse.success(res, response, 'Query Successfully uploaded');
    } catch (error) {
      SystemResponse.failure(res, error, error.msg);
    }
  }

  list = async (req, res) => {
    logger.info('--------List--------');
    try {
      const { skip, limit, order, sortBy, search } = req.query;
      const sort = sortQuery(sortBy, order);
      const query = searchQuery(search);;
      const options = { skip: Number(skip), limit: Number(limit), sort };
      console.log(query, {}, options);
      const response = await queryRepository.list(query, {}, options);
      const count = await queryRepository.count();
      console.log(response)
      SystemResponse.success(res, { ...response, count }, 'List of queries');
    } catch (error) {
      SystemResponse.failure(res, error, error.msg);
    }
  }

  update = async (req, res) => {
    logger.info('--------Update--------');
    try {
      const { id, dataToUpdate } = req.body;
      const { comment } = dataToUpdate;
      const response = await queryRepository.list({ originalId: id }, { comment });
      console.log(response)
      SystemResponse.success(res, response, 'Comment Added');
    } catch (error) {
      SystemResponse.failure(res, error, error.msg);
    }
  }

  delete = async (req, res) => {
    logger.info('--------Delete--------');
    try {
      const { id } = req.params;
      const response = await queryRepository.delete({ originalId: id });
      console.log(response)
      SystemResponse.success(res, response, 'User Successfully Deleted');
    } catch (error) {
      console.log(error)
      SystemResponse.failure(res, error, error.msg);
    }
  }
}

export default Controller.getInstance();