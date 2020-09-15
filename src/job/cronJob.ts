import { CronJob } from 'cron';
import logger from '../libs/logger';
import { queryRepository } from '../repositories/query'

export default class Job {
  init = () => {
    const cronJob = new CronJob('16 16 14 9 *', async () => {
      logger.info(`You will see this message at: ${new Date()}`);
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear() - 1;
      // const year = new Date().getFullYear();
      console.log(date, month, year, new Date(year, month, date + 1));
      const response = await queryRepository.cronUpdate({ resolved: true, updatedAt: { $lte: new Date(year, month, date + 1) } }, { deletedAt: new Date() });
      console.log(response);
    }, null, true, 'Asia/Kolkata');
    cronJob.start();
  }
}
