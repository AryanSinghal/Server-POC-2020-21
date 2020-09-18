import { Router } from 'express';
import userController from './Controller';
import validationHandler from '../../libs/routes/validationHandler';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes/authMiddleWare';

const userRoute: Router = Router();

userRoute.route('/')
  .post(validationHandler(validation.login), userController.login)
  .put(authMiddleWare('Users', 'update'),  userController.updatePassword);

export default userRoute;
