import { Job } from "bullmq";
import { Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import SampleJob from "../jobs/sampleJob";

export default async function (queueName: string) {
  new Worker(
    queueName,
    async function (job?: Job) {
      console.log("Printing the name of the sample job ", job?.name);
      if (job?.name === "sampleJob") {
        const sampleJobInstanceHandler = new SampleJob(job?.data);
        sampleJobInstanceHandler.handler();
      }
    },
    {
      connection: redisConnection,
    }
  );
}
