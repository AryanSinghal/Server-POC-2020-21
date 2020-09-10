import * as express from 'express';

const notFoundRoute = (req: express.Request, res: express.Response, next): express.ErrorRequestHandler => {
    const err = {error: 'Not Found' , message: 'error', status: 404 };
    return next(err);
};

export default notFoundRoute;
