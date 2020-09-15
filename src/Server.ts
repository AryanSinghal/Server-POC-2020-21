import * as express from 'express';
import { default as mainRouter } from './router';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { CronJob } from './job';
import { notFoundRoute, errorHandler } from './libs/routes';
import Database from './libs/Database';
import logger from './libs/logger';

export class Server {
  private app: express.Express;
  constructor(protected config) {
    this.app = express();
  }

  public bootstrap = (): Server => {
    this.initCompress();
    this.initCronJob();
    this.initBodyParser();
    // this.initCors();
    this.setupRoutes();
    return this;
  }

  public run = async (): Promise<Server> => {
    try {
      const { app, config: { port, mongoUrl } }: Server = this;
      await Database.open(mongoUrl);
      app.listen(port, (err) => {
        if (err) {
          logger.error(err);
        }
        logger.info(`Express app Successfully started on port : ${port} `);
      });
    }
    catch (err) {
      throw err;
    }
    return this;
  }

  private initCronJob() {
    logger.info(`Cron Job has been initialized at: ${new Date()}`);
    const cronJob = new CronJob();
    cronJob.init();
  }

  private initCompress = () => {
    this.app.use(compression());
  }

  private initBodyParser = () => {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  }

  public setupRoutes = (): void => {
    const { app }: Server = this;
    app.get('/health-check', (req: express.Request, res: express.Response) => res.send(('I am OK').repeat(1000)));
    app.use('/api', mainRouter);
    app.use(notFoundRoute);
    app.use(errorHandler);
  }
}
