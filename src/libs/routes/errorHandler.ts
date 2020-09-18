import * as express from 'express';

const errorHandler = (err, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const resp = {
                message: err.message || err ,
                status: err.status || 500,
                error: err.error || 'Error Occurred ',
                timestamp: new Date()
            };
    res.status(err.status).send(resp);
    res.end('ok');
};

export default errorHandler;
