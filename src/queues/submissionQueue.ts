import { Queue } from "bullmq";
import { SUBMISSION_QUEUE } from "../util/constants";
import redisConnection from "../config/redis.config";

export default new Queue(SUBMISSION_QUEUE, {
  connection: redisConnection,
});
