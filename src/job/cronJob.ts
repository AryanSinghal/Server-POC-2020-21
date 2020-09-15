import * as schedule from 'node-schedule';
import logger from '../libs/logger';
import { queryRepository } from '../repositories/query'

export default class Job {
  init = () => {
    schedule.scheduleJob({ hour: 23, minute: 59, dayOfWeek: 0 }, async () => {
      logger.info(`You will see this message at: ${new Date()}`);
      const date = new Date().getDate();
      const month = new Date().getMonth();
      const year = new Date().getFullYear() - 1;
      const response = await queryRepository.cronUpdate({ resolved: true, updatedAt: { $lte: new Date(year, month, date + 1) } }, { deletedAt: new Date(), deletedBy: 'Cron Job' });
      console.log(response);
    });
  }
}
