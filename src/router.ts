import { Router } from 'express';
import { queryRoute, userRoute } from './controller';

const mainRouter: Router = Router();
mainRouter.use('/user', userRoute);
mainRouter.use('/query', queryRoute);

export default mainRouter;
