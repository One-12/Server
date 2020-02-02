import config from "../../../config.json";
import Queue, { QueueOptions } from "bull";

export class QueueService {
  private queue: any;

  constructor(queueName: string) {
    const opts: QueueOptions = {
      redis: {
        port: config.job.port,
        host: config.job.host,
        password: config.job.password
      }
    };
    this.queue = new Queue(queueName, opts);
  }

  public produce(data: any) {
    this.queue.add(data);
  }
}
