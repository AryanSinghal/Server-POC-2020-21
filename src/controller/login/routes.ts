import { Router } from 'express';

const loginRoute: Router = Router();

loginRoute.route('/')
  .get((req, res) => { res.send({ success: "ok" }) })
  .put();

export default loginRoute;