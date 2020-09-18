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
      const response = await queryRepository.list(query, {}, options);
      const count = await queryRepository.count();
      SystemResponse.success(res, { ...response, count }, 'List of queries');
    } catch (error) {
      logger.error(error);
      SystemResponse.failure(res, error, error.msg);
    }
  }

  update = async (req, res) => {
    logger.info('--------Update--------');
    try {
      const { id, dataToUpdate } = req.body;
      const { comment, resolved } = dataToUpdate;
      const response = await queryRepository.update({ originalId: id }, { comment, resolved });
      SystemResponse.success(res, 'Query Updated');
    } catch (error) {
      logger.error(error);
      SystemResponse.failure(res, error, 'Unable to Update');
    }
  }

  delete = async (req, res) => {
    logger.info('--------Delete--------');
    try {
      const { id } = req.params;
      const response = await queryRepository.delete({ originalId: id });
      if (!response || !response.n) {
        throw { message: 'Operation Failed' };
      }
      const message = 'Trainee Data Successfully Deleted';
      SystemResponse.success(res, 'Query Successfully Deleted');
    } catch (error) {
      logger.error(error);
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
      const response = await queryRepository.getPastData({ email, search }, { _id: 0, __v: 0 }, options);
      SystemResponse.success(res, response, 'List of queries');
    } catch (error) {
      logger.error(error);
      SystemResponse.failure(res, error, error.msg);
    }
  }
}

export default Controller.getInstance();
