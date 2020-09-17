import { Router } from 'src/controller/user/node_modules/express';
import queryController from './Controller';
import validationHandler from '../../libs/routes/validationHandler';
import validation from '../../controller/query/validation';
import { authMiddleWare } from '../../libs/routes/authMiddleWare';

const queryRoute: Router = Router();

queryRoute.route('/')
  .get(authMiddleWare('Users', 'read'), validationHandler(validation.get), queryController.list)
  .post(validationHandler(validation.create), queryController.create)
  .put(authMiddleWare('Users', 'update'), validationHandler(validation.update), queryController.update);
queryRoute.route('/:id').delete(authMiddleWare('Users', 'delete'), validationHandler(validation.delete), queryController.delete);
queryRoute.route('/:email').get(authMiddleWare('Users', 'read'), validationHandler(validation.getPastData), queryController.getPastData);


export default queryRoute;
