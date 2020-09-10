import { Router } from 'express';
import { queryRoute, loginRoute } from './controller';

const mainRouter: Router = Router();
mainRouter.use('/login', loginRoute);
mainRouter.use('/query', queryRoute);

export default mainRouter;
