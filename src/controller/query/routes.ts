import { Router } from 'express';
import queryController from './Controller';
import validationHandler from '../../libs/routes/validationHandler';
import validation from '../../controller/query/validation';

const queryRoute: Router = Router();

queryRoute.route('/')
  .get(validationHandler(validation.get), queryController.list)
  .post(validationHandler(validation.create), queryController.create)
  .put(validationHandler(validation.update), queryController.update);
queryRoute.route('/:id').delete(validationHandler(validation.delete), queryController.delete);
queryRoute.route('/:email').get(validationHandler(validation.getPastData), queryController.getPastData);


export default queryRoute;
