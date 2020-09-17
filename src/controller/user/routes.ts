import { Router } from 'express';
import userController from './controller';
import validationHandler from '../../libs/routes/validationHandler';
import validation from './validation';

const userRoute: Router = Router();

userRoute.route('/')
  .post(validationHandler(validation.login), userController.login)
  .put();

export default userRoute;