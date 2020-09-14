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
      const query = searchQuery(search);
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
      const { comment, resolved } = dataToUpdate;
      const response = await queryRepository.update({ originalId: id }, { comment, resolved });
      console.log(response)
      SystemResponse.success(res, response, 'Query Updated');
    } catch (error) {
      SystemResponse.failure(res, error, 'Unable to Update');
    }
  }

  delete = async (req, res) => {
    logger.info('--------Delete--------');
    try {
      const { id } = req.params;
      const response = await queryRepository.delete({ originalId: id });
      console.log(response)
      SystemResponse.success(res, response, 'Query Successfully Deleted');
    } catch (error) {
      console.log(error)
      SystemResponse.failure(res, error, 'Unable to delete Query');
    }
  }

  getPastData = async (req, res) => {
    logger.info('--------Get Past Data--------');
    try {
      const { email } = req.params;
      const { skip, limit, order, sortBy, search } = req.query;
      const sort = sortQuery(sortBy, order);
      const options = { skip: Number(skip), limit: Number(limit), sort };
      console.log({ email, search }, { id: 0 }, options);
      const response = await queryRepository.getPastData({ email, search }, { _id: 0, __v: 0 }, options);
      console.log(response)
      SystemResponse.success(res, response, 'List of queries');
    } catch (error) {
      console.log(error);
      SystemResponse.failure(res, error, error.msg);
    }
  }
}

export default Controller.getInstance();