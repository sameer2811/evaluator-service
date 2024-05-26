import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import { SUBMISSION_JOB } from "../util/constants";
import SubmissionJob from "../jobs/submissionJob";
export default async function initalizeSubmissionWorker(queueName: string) {
  return new Worker(
    queueName,
    async function (job: Job) {
      if (job?.name == SUBMISSION_JOB) {
        const submissionJob = new SubmissionJob(job?.data);
        submissionJob.handler();
      }
    },
    {
      connection: redisConnection,
    }
  );
}
